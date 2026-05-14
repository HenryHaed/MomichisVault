import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './data-source';
import { Usuario } from './entities/usuario.entity';
import { IntegracionNube } from './entities/integracion-nube.entity';
import { Carpeta } from './entities/carpeta.entity';
import { Archivo } from './entities/archivo.entity';
import { TareaProcesamiento } from './entities/tarea-procesamiento.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DropboxController } from './dropbox.controller';
import { DropboxService } from './dropbox.service';
import { AiService } from './ai.service';
import { OcrStorageService } from './ocr-storage.service';
import { OcrStorageController } from './ocr-storage.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true, // Esto carga automáticamente las entidades registradas en cada módulo
    }),
    TypeOrmModule.forFeature([Usuario, IntegracionNube, Carpeta, Archivo, TareaProcesamiento])
  ],
  controllers: [AppController, AuthController, DropboxController, OcrStorageController],
  providers: [AppService, AuthService, DropboxService, AiService, OcrStorageService],
})
export class AppModule {}
