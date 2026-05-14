import { Controller, Delete, Get, Param } from '@nestjs/common';
import { OcrStorageService } from './ocr-storage.service';

@Controller('ocr-storage')
export class OcrStorageController {
  constructor(private readonly ocrStorageService: OcrStorageService) {}

  /**
   * Lista todos los archivos OCR disponibles
   */
  @Get('list')
  listFiles() {
    return this.ocrStorageService.listOcrFiles();
  }

  /**
   * Obtiene el contenido de un archivo OCR
   */
  @Get('file/:fileId')
  getFile(@Param('fileId') fileId: string) {
    const content = this.ocrStorageService.getOcrFile(fileId);
    if (!content) {
      return { error: 'Archivo no encontrado' };
    }
    return { fileId, content };
  }

  /**
   * Elimina un archivo OCR
   */
  @Delete('file/:fileId')
  deleteFile(@Param('fileId') fileId: string) {
    const deleted = this.ocrStorageService.deleteOcrFile(fileId);
    return {
      success: deleted,
      message: deleted ? 'Archivo eliminado' : 'Archivo no encontrado',
    };
  }

  /**
   * Limpia archivos antiguos (más de 24 horas)
   */
  @Delete('cleanup')
  cleanup() {
    const count = this.ocrStorageService.cleanupOldFiles(24);
    return {
      message: `${count} archivos antiguos eliminados`,
      deletedCount: count,
    };
  }
}
