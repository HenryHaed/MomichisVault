import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class OcrStorageService {
  private readonly tempDir = path.join(process.cwd(), 'temp', 'ocr');

  constructor() {
    // Crear directorio temporal si no existe
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  /**
   * Guarda un archivo OCR temporalmente
   * @param filename Nombre del archivo
   * @param content Contenido del OCR
   * @returns ID del archivo guardado
   */
  saveOcrFile(filename: string, content: string): string {
    const fileId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const cleanFilename = filename.replace(/\.[^/.]+$/, '');
    const filePath = path.join(this.tempDir, `${fileId}_${cleanFilename}.txt`);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`📄 OCR guardado temporalmente: ${filePath}`);

    return fileId;
  }

  /**
   * Obtiene el contenido de un archivo OCR
   */
  getOcrFile(fileId: string): string | null {
    const files = fs.readdirSync(this.tempDir);
    const file = files.find((f) => f.startsWith(fileId));

    if (!file) return null;

    const filePath = path.join(this.tempDir, file);
    return fs.readFileSync(filePath, 'utf8');
  }

  /**
   * Lista todos los archivos OCR almacenados
   */
  listOcrFiles(): Array<{
    fileId: string;
    filename: string;
    size: number;
    createdAt: Date;
  }> {
    const files = fs.readdirSync(this.tempDir);
    return files.map((file) => {
      const filePath = path.join(this.tempDir, file);
      const stats = fs.statSync(filePath);
      const fileId = file.split('_')[0];
      const filename = file.split('_').slice(1).join('_').replace('.txt', '');

      return {
        fileId,
        filename,
        size: stats.size,
        createdAt: stats.birthtime,
      };
    });
  }

  /**
   * Elimina un archivo OCR temporal
   */
  deleteOcrFile(fileId: string): boolean {
    const files = fs.readdirSync(this.tempDir);
    const file = files.find((f) => f.startsWith(fileId));

    if (!file) return false;

    const filePath = path.join(this.tempDir, file);
    fs.unlinkSync(filePath);
    console.log(`🗑️  OCR eliminado: ${filePath}`);

    return true;
  }

  /**
   * Limpia archivos OCR más antiguos de X horas
   */
  cleanupOldFiles(hoursOld: number = 24): number {
    const files = fs.readdirSync(this.tempDir);
    const now = Date.now();
    const maxAge = hoursOld * 60 * 60 * 1000;
    let deletedCount = 0;

    files.forEach((file) => {
      const filePath = path.join(this.tempDir, file);
      const stats = fs.statSync(filePath);
      const age = now - stats.birthtime.getTime();

      if (age > maxAge) {
        fs.unlinkSync(filePath);
        deletedCount++;
      }
    });

    if (deletedCount > 0) {
      console.log(`🧹 Limpieza: ${deletedCount} archivos OCR eliminados`);
    }

    return deletedCount;
  }
}
