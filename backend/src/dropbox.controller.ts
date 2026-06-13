import { Body, Controller, Delete, Get, Post, Query, Req, Res, UploadedFile, UseInterceptors, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { DropboxService } from './dropbox.service';

interface DropboxWebhookBody {
  list_folder?: {
    accounts: string[];
  };
}

interface DropboxConfigBody {
  entradaFolderId: string;
  salidaFolderId: string;
}

interface DropboxTokenBody {
  accountId: string;
  accessToken: string;
  refreshToken?: string;
}

@Controller('dropbox')
export class DropboxController {
  constructor(private readonly dropboxService: DropboxService) {}

  @Get('auth')
  async auth(@Res() res: Response) {
    const url = this.dropboxService.getAuthUrl();
    return res.redirect(url);
  }

  @Get('oauth/callback')
  async callback(@Query('code') code: string) {
    return this.dropboxService.exchangeCodeForToken(code);
  }

  @Post('config')
  async config(@Body() body: DropboxConfigBody) {
    return this.dropboxService.setFolderIds(body.entradaFolderId, body.salidaFolderId);
  }

  @Post('token')
  async saveToken(@Body() body: DropboxTokenBody) {
    return this.dropboxService.saveToken(body.accountId, body.accessToken, body.refreshToken);
  }

  @Get('folder-id')
  async getFolderId(@Query('path') path: string) {
    return this.dropboxService.getFolderIdByPath(path);
  }

  @Get('status')
  async status() {
    return this.dropboxService.getStatus();
  }

  @Get('webhook')
  webhookChallenge(@Query('challenge') challenge: string) {
    return challenge;
  }

  @Post('webhook')
  async webhook(@Req() req: Request, @Body() body: DropboxWebhookBody) {
    const rawBody = req.body as unknown as Buffer;
    const signature = req.header('x-dropbox-signature') || '';
    this.dropboxService.verifySignature(rawBody, signature);

    const accounts = body?.list_folder?.accounts || [];
    await this.dropboxService.handleWebhook(accounts);
    return { ok: true };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: any,
    @Body('task') task?: string,
    @Body('watermarkText') watermarkText?: string,
    @Body('watermarkColor') watermarkColor?: string,
    @Body('watermarkBold') watermarkBold?: string,
    @Body('watermarkItalic') watermarkItalic?: string
  ) {
    if (!file) {
      return { ok: false, message: 'Ningún archivo enviado' };
    }
    const watermarkOptions = {
      color: watermarkColor || '#ffffff',
      bold: watermarkBold === 'true',
      italic: watermarkItalic === 'true'
    };
    return this.dropboxService.processAndUpload(file.buffer, file.originalname, task, watermarkText, watermarkOptions);
  }

  @Get('files')
  async getFiles() {
    return this.dropboxService.getOutputFiles();
  }

  @Get('report')
  async getReport(@Query('usuarioId') usuarioId: string, @Res() res: Response) {
    let targetId = usuarioId;

    if (!targetId || targetId === 'null' || targetId === 'undefined') {
       // Buscar id por defecto del admin
       const integracion = await this.dropboxService.getStatus();
       const user = await this.dropboxService['usuarioRepository'].findOne({where:{correoElectronico: 'admin@carpetamagica.com'}});
       if(user && user.id) targetId = user.id;
    }

    if (!targetId) {
      return res.status(400).send('Se requiere usuarioId o loguear con admin.');
    }
    
    try {
      const pdfBuffer = await this.dropboxService.generateReport(targetId);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="Reporte_Trafico.pdf"`);
      return res.end(pdfBuffer);
    } catch (e) {
      console.error('Error al generar PDF: ', e);
      return res.status(500).send('Error interno al generar pdf');
    }
  }

  @Get('download')
  async downloadFile(@Query('path') path: string, @Res() res: Response) {
    const fileData = await this.dropboxService.downloadFile(path);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${path.split('/').pop()}"`);
    return res.end(fileData);
  }

  @Delete('file/:archivoId')
  async deleteFile(@Param('archivoId') archivoId: string) {
    return this.dropboxService.deleteFile(archivoId);
  }
}
