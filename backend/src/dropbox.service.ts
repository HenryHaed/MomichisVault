import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import crypto from 'crypto';
import { Dropbox } from 'dropbox';
import pdfParse from 'pdf-parse';
import sharp from 'sharp';
import { AiService } from './ai.service';
import { OcrStorageService } from './ocr-storage.service';
import { IntegracionNube } from './entities/integracion-nube.entity';
import { Carpeta, TipoCarpeta } from './entities/carpeta.entity';
import { Usuario } from './entities/usuario.entity';
import { Archivo, EstadoSubida } from './entities/archivo.entity';
import PDFDocument from 'pdfkit';

const DROPBOX_AUTH_URL = 'https://www.dropbox.com/oauth2/authorize';
const DROPBOX_TOKEN_URL = 'https://api.dropboxapi.com/oauth2/token';

@Injectable()
export class DropboxService {
  constructor(
    @InjectRepository(IntegracionNube)
    private readonly integracionRepository: Repository<IntegracionNube>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Carpeta)
    private readonly carpetaRepository: Repository<Carpeta>,
    @InjectRepository(Archivo)
    private readonly archivoRepository: Repository<Archivo>,
    private readonly aiService: AiService,
    private readonly ocrStorageService: OcrStorageService
  ) {}

  getAuthUrl() {
    const appKey = process.env.DROPBOX_APP_KEY || '';
    const redirectUri = process.env.DROPBOX_REDIRECT_URL || '';

    const params = new URLSearchParams({
      client_id: appKey,
      response_type: 'code',
      token_access_type: 'offline',
      force_reapprove: 'true',
      scope: 'files.metadata.read files.content.read files.content.write',
      redirect_uri: redirectUri
    });

    return `${DROPBOX_AUTH_URL}?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string) {
    const appKey = process.env.DROPBOX_APP_KEY || '';
    const appSecret = process.env.DROPBOX_APP_SECRET || '';
    const redirectUri = process.env.DROPBOX_REDIRECT_URL || '';

    const auth = Buffer.from(`${appKey}:${appSecret}`).toString('base64');
    const body = new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri
    });

    const response = await fetch(DROPBOX_TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener el token de Dropbox.');
    }

    const data = (await response.json()) as {
      access_token: string;
      refresh_token?: string;
      account_id: string;
    };

    const usuario = await this.usuarioRepository.findOne({
      where: { correoElectronico: 'admin@carpetamagica.com' }
    });

    if (!usuario) {
      throw new Error('Usuario base no encontrado. Ejecuta el seed.');
    }

    let integracion = await this.integracionRepository.findOne({
      where: { proveedor: 'dropbox', usuario: { id: usuario.id } }
    });

    if (!integracion) {
      integracion = this.integracionRepository.create({
        usuario,
        proveedor: 'dropbox',
        idCuentaNube: data.account_id,
        tokenAcceso: data.access_token,
        tokenRefresco: data.refresh_token || '',
        cursorWebhook: ''
      });
    } else {
      integracion.idCuentaNube = data.account_id;
      integracion.tokenAcceso = data.access_token;
      integracion.tokenRefresco = data.refresh_token || integracion.tokenRefresco;
    }

    await this.integracionRepository.save(integracion);

    return { ok: true, accountId: data.account_id };
  }

  async setFolderIds(entradaFolderId: string, salidaFolderId: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { correoElectronico: 'admin@carpetamagica.com' }
    });

    if (!usuario) {
      throw new Error('Usuario base no encontrado.');
    }

    const carpetaEntrada = await this.carpetaRepository.findOne({
      where: { usuario: { id: usuario.id }, tipoCarpeta: TipoCarpeta.ENTRADA_MAGICA }
    });

    const carpetaSalida = await this.carpetaRepository.findOne({
      where: { usuario: { id: usuario.id }, tipoCarpeta: TipoCarpeta.SALIDA_PROCESADA }
    });

    if (!carpetaEntrada || !carpetaSalida) {
      throw new Error('Carpetas base no encontradas. Ejecuta el seed.');
    }

    carpetaEntrada.idCarpetaNube = entradaFolderId;
    carpetaSalida.idCarpetaNube = salidaFolderId;

    await this.carpetaRepository.save([carpetaEntrada, carpetaSalida]);
    return { ok: true };
  }

  async saveToken(accountId: string, accessToken: string, refreshToken?: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { correoElectronico: 'admin@carpetamagica.com' }
    });

    if (!usuario) {
      throw new Error('Usuario base no encontrado. Ejecuta el seed.');
    }

    let integracion = await this.integracionRepository.findOne({
      where: { proveedor: 'dropbox', usuario: { id: usuario.id } }
    });

    if (!integracion) {
      integracion = this.integracionRepository.create({
        usuario,
        proveedor: 'dropbox',
        idCuentaNube: accountId,
        tokenAcceso: accessToken,
        tokenRefresco: refreshToken || '',
        cursorWebhook: ''
      });
    } else {
      integracion.idCuentaNube = accountId;
      integracion.tokenAcceso = accessToken;
      if (refreshToken) {
        integracion.tokenRefresco = refreshToken;
      }
    }

    await this.integracionRepository.save(integracion);
    return { ok: true, accountId };
  }

  async getFolderIdByPath(path: string) {
    if (!path || !path.startsWith('/')) {
      throw new Error('Debes enviar un path valido, por ejemplo: /Momichis');
    }

    const integraciones = await this.integracionRepository.find({
      where: { proveedor: 'dropbox' },
      relations: ['usuario']
    });

    const integracion = integraciones.find((item) => {
      const token = item.tokenAcceso || '';
      return token && !token.startsWith('mock_');
    }) || integraciones[0];

    if (!integracion) {
      throw new Error('No hay integracion Dropbox. Autoriza la app primero.');
    }

    const accessToken = await this.getValidAccessToken(integracion);
    const dbx = new Dropbox({ accessToken });
    let metadata;
    try {
      metadata = await dbx.filesGetMetadata({ path });
    } catch (error: any) {
      if (error && error.status === 409 && error.error?.error_summary?.includes('path/not_found')) {
        console.log(`La carpeta ${path} no existe. Creándola...`);
        const createResult = await dbx.filesCreateFolderV2({ path, autorename: false });
        metadata = { result: createResult.result.metadata };
      } else if (this.isInvalidAccessTokenError(error)) {
        const refreshed = await this.refreshAccessToken(integracion);
        try {
          metadata = await new Dropbox({ accessToken: refreshed }).filesGetMetadata({ path });
        } catch (refreshedError: any) {
          if (refreshedError && refreshedError.status === 409 && refreshedError.error?.error_summary?.includes('path/not_found')) {
             console.log(`La carpeta ${path} no existe. Creándola con nuevo token...`);
             const createResult = await new Dropbox({ accessToken: refreshed }).filesCreateFolderV2({ path, autorename: false });
             metadata = { result: createResult.result.metadata };
          } else {
            throw refreshedError;
          }
        }
      } else {
        throw error;
      }
    }
    const result = metadata.result as { id?: string; name?: string };

    if (!result.id) {
      throw new Error('No se encontro el ID de la carpeta.');
    }

    return { ok: true, id: result.id, name: result.name };
  }

  async getStatus() {
    const integracion = await this.integracionRepository.findOne({
      where: { proveedor: 'dropbox' }
    });

    if (!integracion) {
      return { ok: false, reason: 'no_integracion' };
    }

    return {
      ok: true,
      accountId: integracion.idCuentaNube,
      hasAccessToken: Boolean(integracion.tokenAcceso),
      hasRefreshToken: Boolean(integracion.tokenRefresco)
    };
  }

  async generateReport(usuarioId: string): Promise<Buffer> {
    const archivos = await this.archivoRepository.find({
      where: { usuario: { id: usuarioId } },
      order: { fechaCreacion: 'DESC' },
      relations: ['usuario']
    });

    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const buffers: Buffer[] = [];
        
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        // Estilos del documento
        doc.fontSize(20).text('Reporte de Tráfico y Transferencia de Archivos', { align: 'center' });
        doc.moveDown();
        
        doc.fontSize(12).text(`Fecha de Emisión: ${new Date().toLocaleString()}`);
        if (archivos.length > 0) {
          doc.text(`Generado para el usuario: Administrador (${archivos[0].usuario.correoElectronico})`);
        }
        doc.moveDown(2);

        // Tabla de archivos
        let y = doc.y;
        doc.fontSize(10).font('Helvetica-Bold');
        doc.text('Archivo', 50, y, { width: 200 });
        doc.text('Tamaño (Bytes)', 250, y, { width: 100 });
        doc.text('Fecha de Subida', 350, y, { width: 150 });
        
        doc.moveTo(50, y + 15).lineTo(500, y + 15).stroke();
        
        doc.font('Helvetica');
        let currentY = y + 25;

        for (const archivo of archivos) {
           if (currentY > 700) {
              doc.addPage();
              currentY = 50;
           }
           doc.text(archivo.nombreOriginal || 'Desconocido', 50, currentY, { width: 190, lineBreak: false });
           doc.text(archivo.tamanoBytes?.toString() || '0', 250, currentY, { width: 90, lineBreak: false });
           doc.text(new Date(archivo.fechaCreacion).toLocaleString(), 350, currentY, { width: 140, lineBreak: false });
           
           currentY += 20;
        }

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  }

  async getValidDbxClient(): Promise<Dropbox> {
    const integraciones = await this.integracionRepository.find({
      where: { proveedor: 'dropbox' },
      relations: ['usuario']
    });

    const integracion = integraciones.find((item) => {
      const token = item.tokenAcceso || '';
      return token && !token.startsWith('mock_');
    }) || integraciones[0];

    if (!integracion) {
      throw new Error('No hay integracion Dropbox. Autoriza la app primero.');
    }

    const accessToken = await this.getValidAccessToken(integracion);
    return new Dropbox({ accessToken });
  }

  async processAndUpload(fileBuffer: Buffer, filename: string, task?: string, customWatermark?: string, watermarkOptions?: { color: string; bold: boolean; italic: boolean }) {
    const dbx = await this.getValidDbxClient();
    
    // Obtenemos las carpetas base del admin
    const usuario = await this.usuarioRepository.findOne({
      where: { correoElectronico: 'admin@carpetamagica.com' }
    });
    
    const carpetaEntrada = await this.carpetaRepository.findOne({
      where: { usuario: { id: usuario?.id }, tipoCarpeta: TipoCarpeta.ENTRADA_MAGICA }
    });
    const carpetaSalida = await this.carpetaRepository.findOne({
      where: { usuario: { id: usuario?.id }, tipoCarpeta: TipoCarpeta.SALIDA_PROCESADA }
    });

    if (!carpetaEntrada || !carpetaSalida || !carpetaEntrada.idCarpetaNube || !carpetaSalida.idCarpetaNube) {
      throw new Error('Faltan configurar las carpetas (Entrada/Salida) en la BD.');
    }

    // 1. Subir original a Entrada
    const pathEntrada = carpetaEntrada.idCarpetaNube.startsWith('id:') 
      ? `${carpetaEntrada.idCarpetaNube}/${filename}` 
      : (carpetaEntrada.idCarpetaNube.startsWith('/') ? `${carpetaEntrada.idCarpetaNube}/${filename}` : `/${carpetaEntrada.idCarpetaNube}/${filename}`);

    await dbx.filesUpload({
      path: pathEntrada,
      contents: fileBuffer,
      mode: { '.tag': 'overwrite' }
    } as any);

    // 2. Procesar según la tarea y guardar en Salida
    const extension = (filename.split('.').pop() || '').toLowerCase();
    const isImage = ['png', 'jpg', 'jpeg', 'webp'].includes(extension);

    let outputFilename = filename;
    let resumenIaFinal: string | null = null;

    const pathSalidaBase = carpetaSalida.idCarpetaNube.startsWith('id:')
      ? carpetaSalida.idCarpetaNube
      : (carpetaSalida.idCarpetaNube.startsWith('/') ? carpetaSalida.idCarpetaNube : `/${carpetaSalida.idCarpetaNube}`);

    let ocrFileId: string | null = null;

    if (task === 'webp' && isImage) {
      outputFilename = await this.processImage(dbx, fileBuffer, filename, pathSalidaBase, false);
    } else if (task === 'watermark' && isImage) {
      outputFilename = await this.processImage(dbx, fileBuffer, filename, pathSalidaBase, true, customWatermark, watermarkOptions);
    } else if (task === 'ocr' && extension === 'pdf') {
       const result = await this.processPdf(dbx, fileBuffer, filename, pathSalidaBase);
       outputFilename = result.outputName;
       resumenIaFinal = result.resumen;
       ocrFileId = result.ocrFileId;
    } else if (isImage && !task) {
      // Default: Imagen con marca de agua (Momichis Vault)
      outputFilename = await this.processImage(dbx, fileBuffer, filename, pathSalidaBase, true);
    } else if (extension === 'pdf' && !task) {
       // Default: PDF a TXT
       const result = await this.processPdf(dbx, fileBuffer, filename, pathSalidaBase);
       outputFilename = result.outputName;
       resumenIaFinal = result.resumen;
       ocrFileId = result.ocrFileId;
    } else {
      // Si la tarea o formato no coinciden o no es un tipo procesable, guardar tal cual
      const finalSalidaPath = pathSalidaBase.startsWith('id:') ? `${pathSalidaBase}/${filename}` : (pathSalidaBase.startsWith('/') ? `${pathSalidaBase}/${filename}` : `/${pathSalidaBase}/${filename}`);
      await dbx.filesUpload({
        path: finalSalidaPath,
        contents: fileBuffer,
        mode: { '.tag': 'overwrite' }
      } as any);
    }

    if (usuario && carpetaSalida) {
      const rutaFinal = pathSalidaBase.startsWith('id:') ? `${pathSalidaBase}/${outputFilename}` : (pathSalidaBase.startsWith('/') ? `${pathSalidaBase}/${outputFilename}` : `/${pathSalidaBase}/${outputFilename}`);
      
      const nuevoArchivo = this.archivoRepository.create({
        nombreOriginal: outputFilename,
        tipoMime: isImage ? 'image/webp' : (extension === 'pdf' ? 'application/pdf' : 'application/octet-stream'),
        tamanoBytes: fileBuffer.length,
        estadoSubida: EstadoSubida.SINCRONIZADO,
        resumenIa: resumenIaFinal,
        rutaAlmacenamiento: rutaFinal,
        ocrFileId: ocrFileId
      });
      
      // Asignar relaciones
      nuevoArchivo.usuario = usuario;
      nuevoArchivo.carpeta = carpetaSalida;
      
      await this.archivoRepository.save(nuevoArchivo);
    }

    return { ok: true, message: 'Archivo subido y procesado exitosamente.' };
  }

  async getOutputFiles() {
    const dbx = await this.getValidDbxClient();

    const usuario = await this.usuarioRepository.findOne({
      where: { correoElectronico: 'admin@carpetamagica.com' }
    });
    const carpetaSalida = await this.carpetaRepository.findOne({
      where: { usuario: { id: usuario?.id }, tipoCarpeta: TipoCarpeta.SALIDA_PROCESADA }
    });

    if (!carpetaSalida || !carpetaSalida.idCarpetaNube) {
      throw new Error('Falta configurar la carpeta de Salida en la BD.');
    }

    let listResponse;
    try {
      listResponse = await dbx.filesListFolder({ path: carpetaSalida.idCarpetaNube });
    } catch (e: any) {
       console.log('Error listing folder: ', e?.error || e);
       return { ok: false, files: [] };
    }

    const dbArchivos = usuario ? await this.archivoRepository.find({
      where: { usuario: { id: usuario.id } }
    }) : [];

    const files = listResponse.result.entries
      .filter((entry) => entry['.tag'] === 'file')
      .map((entry) => {
        const dbFile = dbArchivos.find(f => f.nombreOriginal === entry.name);
        return {
          id: entry.id,
          name: entry.name,
          path: entry.path_lower,
          size: (entry as any).size,
          client_modified: (entry as any).client_modified,
          resumenIa: dbFile ? dbFile.resumenIa : null
        };
      });

    return { ok: true, files };
  }

  async downloadFile(path: string): Promise<Buffer> {
    const dbx = await this.getValidDbxClient();
    const download = await dbx.filesDownload({ path });
    const result = download.result as any;
    const fileBuffer = Buffer.isBuffer(result.fileBinary)
      ? result.fileBinary
      : Buffer.from(result.fileBinary as ArrayBuffer);
    return fileBuffer;
  }

  async deleteFile(archivoId: string) {
    try {
      // Intentamos buscar por id_archivo_nube si el archivoId empieza con 'id:' (que es el formato de Dropbox)
      // O si es un UUID válido lo buscamos por id.
      const esDropboxId = archivoId.startsWith('id:');
      
      const archivo = await this.archivoRepository.findOne({
        where: esDropboxId ? { idArchivoNube: archivoId } : { id: archivoId },
        relations: ['usuario'] // Necesitamos la relación usuario para obtener la integración
      });

      // Si no existe en la BD pero es un ID de dropbox, trataremos de limpiarlo en Dropbox directamente
      const usuarioAdmin = await this.usuarioRepository.findOne({ where: { correoElectronico: 'admin@carpetamagica.com' } });
      const integracion = archivo 
        ? await this.integracionRepository.findOne({ where: { usuario: { id: archivo.usuario.id } } })
        : await this.integracionRepository.findOne({ where: { usuario: { id: usuarioAdmin?.id } } });

      if (!integracion) {
        return { ok: false, message: 'Integración Dropbox no encontrada' };
      }

      const token = await this.getValidAccessToken(integracion);
      const dbx = new Dropbox({ accessToken: token });

      let rutaDropbox = archivo?.rutaAlmacenamiento;

      // Si no tenemos ruta porque es fantasma, lo buscamos en los metadatos
      if (!archivo && esDropboxId) {
        try {
          const meta = await dbx.filesGetMetadata({ path: archivoId });
          rutaDropbox = (meta.result as any).path_lower;
        } catch (e: any) {
           console.log(`El archivo fantasma ${archivoId} no se pudo encontrar en Dropbox:`, e.error || e.message);
        }
      }

      // Eliminar archivo de Dropbox
      if (rutaDropbox) {
        try {
          await dbx.filesDeleteV2({ path: rutaDropbox });
          console.log(`🗑️ Archivo eliminado de Dropbox: ${rutaDropbox}`);
        } catch (error) {
          console.warn(`Advertencia al eliminar de Dropbox: ${error}`);
          // Continuar aunque falle la eliminación en Dropbox
        }
      }

      // Eliminar del registro de base de datos y OCR
      if (archivo) {
        if (archivo.ocrFileId) {
          try {
            const ocrDeleted = this.ocrStorageService.deleteOcrFile(archivo.ocrFileId);
            if (ocrDeleted) {
              console.log(`🗑️ OCR temporal eliminado: ${archivo.ocrFileId}`);
            }
          } catch (error) {
            console.warn(`Advertencia al eliminar OCR: ${error}`);
          }
        }
        await this.archivoRepository.remove(archivo);
      }

      return {
        ok: true,
        message: 'Archivo eliminado exitosamente (Limpiado huerfanos)'
      };
    } catch (error) {
      console.error('Error al eliminar archivo:', error);
      return {
        ok: false,
        message: 'Error al eliminar archivo'
      };
    }
  }

  verifySignature(rawBody: Buffer, signature: string) {
    const appSecret = process.env.DROPBOX_APP_SECRET || '';
    const hmac = crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex');

    const isValid = signature && crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
    if (!isValid) {
      throw new UnauthorizedException('Firma de webhook invalida.');
    }
  }

  async handleWebhook(accountIds: string[]) {
    for (const accountId of accountIds) {
      const integracion = await this.integracionRepository.findOne({
        where: { proveedor: 'dropbox', idCuentaNube: accountId },
        relations: ['usuario']
      });

      if (!integracion) {
        continue;
      }

      await this.processDropboxChanges(integracion);
    }
  }

  private async processDropboxChanges(integracion: IntegracionNube) {
    const accessToken = await this.getValidAccessToken(integracion);
    let dbx = new Dropbox({ accessToken });
    const usuario = integracion.usuario;

    const carpetaEntrada = await this.carpetaRepository.findOne({
      where: { usuario: { id: usuario.id }, tipoCarpeta: TipoCarpeta.ENTRADA_MAGICA }
    });

    const carpetaSalida = await this.carpetaRepository.findOne({
      where: { usuario: { id: usuario.id }, tipoCarpeta: TipoCarpeta.SALIDA_PROCESADA }
    });

    if (!carpetaEntrada || !carpetaEntrada.idCarpetaNube || !carpetaSalida || !carpetaSalida.idCarpetaNube) {
      return;
    }

    const listParams = integracion.cursorWebhook
      ? { cursor: integracion.cursorWebhook }
      : { path: `id:${carpetaEntrada.idCarpetaNube}` };

    let listResponse;
    try {
      listResponse = integracion.cursorWebhook
        ? await dbx.filesListFolderContinue(listParams as any)
        : await dbx.filesListFolder(listParams as any);
    } catch (error) {
      if (this.isInvalidAccessTokenError(error)) {
        const refreshed = await this.refreshAccessToken(integracion);
        dbx = new Dropbox({ accessToken: refreshed });
        listResponse = integracion.cursorWebhook
          ? await dbx.filesListFolderContinue(listParams as any)
          : await dbx.filesListFolder(listParams as any);
      } else {
        throw error;
      }
    }

    integracion.cursorWebhook = listResponse.result.cursor;
    await this.integracionRepository.save(integracion);

    for (const entry of listResponse.result.entries) {
      if (entry['.tag'] !== 'file') {
        continue;
      }

      const download = await dbx.filesDownload({ path: entry.path_lower || entry.id });
      const result = download.result as any;
      const fileBuffer = Buffer.isBuffer(result.fileBinary)
        ? result.fileBinary
        : Buffer.from(result.fileBinary as ArrayBuffer);

      const extension = (entry.name.split('.').pop() || '').toLowerCase();
      if (['png', 'jpg', 'jpeg'].includes(extension)) {
        await this.processImage(dbx, fileBuffer, entry.name, carpetaSalida.idCarpetaNube, true);
      } else if (extension === 'pdf') {
        await this.processPdf(dbx, fileBuffer, entry.name, carpetaSalida.idCarpetaNube);
      }
    }
  }

  private async processImage(dbx: Dropbox, fileBuffer: Buffer, filename: string, salidaFolderId: string, addWatermark: boolean = true, customWatermark?: string, watermarkOptions?: { color: string; bold: boolean; italic: boolean }) {
    const webpBuffer = await sharp(fileBuffer).webp({ quality: 80 }).toBuffer();
    
    let finalBuffer = webpBuffer;
    let suffix = '';

    if (addWatermark) {
      const metadata = await sharp(webpBuffer).metadata();
      const width = metadata.width || 800;
      const height = metadata.height || 200;

      const watermarkText = customWatermark || 'Momichis Vault';
      const watermarkColor = watermarkOptions?.color || '#ffffff';
      const isBold = watermarkOptions?.bold || false;
      const isItalic = watermarkOptions?.italic || false;
      
      const fontWeight = isBold ? 'bold' : 'normal';
      const fontStyle = isItalic ? 'italic' : 'normal';
      const fontSize = Math.max(20, Math.floor(width / 15));
      
      // Convertir hex a rgba para semi-transparencia
      const hexToRgba = (hex: string, alpha: number = 0.7) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
      };

      const watermarkSvg = `
        <svg width="${width}" height="${height}">
          <style>
            .text { fill: ${hexToRgba(watermarkColor)}; font-size: ${fontSize}px; font-family: Arial, sans-serif; font-weight: ${fontWeight}; font-style: ${fontStyle}; }
          </style>
          <text x="20" y="${height - 20}" class="text">${watermarkText}</text>
        </svg>
      `;

      finalBuffer = await sharp(webpBuffer)
        .composite([{ input: Buffer.from(watermarkSvg), gravity: 'southeast' }])
        .toBuffer();
      
      suffix = '_wm';
    }

    const outputName = `${filename.replace(/\.[^/.]+$/, '')}${suffix}.webp`;
    const finalSalidaPath = salidaFolderId.startsWith('id:') ? `${salidaFolderId}/${outputName}` : (salidaFolderId.startsWith('/') ? `${salidaFolderId}/${outputName}` : `/${salidaFolderId}/${outputName}`);
    
    await dbx.filesUpload({
      path: finalSalidaPath,
      contents: finalBuffer,
      mode: { '.tag': 'overwrite' }
    } as any);
    return outputName;
  }

  private async processPdf(dbx: Dropbox, fileBuffer: Buffer, filename: string, salidaFolderId: string) {
    const parsed = await pdfParse(fileBuffer);
    const textoCompleto = parsed.text || '';
    const textBuffer = Buffer.from(textoCompleto);

    const outputName = `${filename.replace(/\.[^/.]+$/, '')}.txt`;
    const finalSalidaPath = salidaFolderId.startsWith('id:') ? `${salidaFolderId}/${outputName}` : (salidaFolderId.startsWith('/') ? `${salidaFolderId}/${outputName}` : `/${salidaFolderId}/${outputName}`);

    await dbx.filesUpload({
      path: finalSalidaPath,
      contents: textBuffer,
      mode: { '.tag': 'overwrite' }
    } as any);

    // 💾 Guardar OCR temporalmente en el servidor para acceso rápido
    let ocrFileId: string | null = null;
    if (textoCompleto.trim().length > 0) {
      ocrFileId = this.ocrStorageService.saveOcrFile(filename, textoCompleto);
    }

    // Generar resumen con IA si hay contenido legible (mínimo 100 caracteres para mejor precisión)
    let resumen: string | null = null;
    if (textoCompleto.trim().length > 100) {
      try {
        resumen = await this.aiService.generarResumen(textoCompleto.substring(0, 3000));
      } catch (error) {
        console.error('Error generando resumen:', error);
        resumen = null;
      }
    }

    return { outputName, resumen, ocrFileId };
  }

  private async getValidAccessToken(integracion: IntegracionNube) {
    if (integracion.tokenAcceso) {
      if (integracion.tokenAcceso.startsWith('dbid:')) {
        throw new Error('Token invalido: guardaste un accountId en lugar del access token. Reautoriza Dropbox.');
      }
      return integracion.tokenAcceso;
    }
    return this.refreshAccessToken(integracion);
  }

  private async refreshAccessToken(integracion: IntegracionNube) {
    if (!integracion.tokenRefresco) {
      throw new Error('No hay refresh token. Reautoriza Dropbox.');
    }

    const appKey = process.env.DROPBOX_APP_KEY || '';
    const appSecret = process.env.DROPBOX_APP_SECRET || '';
    const auth = Buffer.from(`${appKey}:${appSecret}`).toString('base64');

    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: integracion.tokenRefresco
    });

    const response = await fetch(DROPBOX_TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });

    if (!response.ok) {
      throw new Error('No se pudo refrescar el token de Dropbox.');
    }

    const data = (await response.json()) as { access_token: string };
    integracion.tokenAcceso = data.access_token;
    await this.integracionRepository.save(integracion);

    return data.access_token;
  }

  private isInvalidAccessTokenError(error: unknown) {
    const summary = (error as any)?.error?.error_summary as string | undefined;
    return summary?.includes('invalid_access_token') || (error as any)?.status === 401;
  }
}
