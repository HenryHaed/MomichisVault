import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Carpeta } from './carpeta.entity';
import { TareaProcesamiento } from './tarea-procesamiento.entity';

export enum EstadoSubida {
  SUBIENDO = 'subiendo',
  SINCRONIZADO = 'sincronizado',
  ELIMINADO = 'eliminado'
}

@Entity('archivos')
export class Archivo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.archivos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Carpeta, (carpeta) => carpeta.archivos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carpeta_id' })
  carpeta: Carpeta;

  @Column({ name: 'nombre_original' })
  nombreOriginal: string;

  @Column({ name: 'id_archivo_nube', nullable: true })
  idArchivoNube: string;

  @Column({ name: 'ruta_visualizacion', nullable: true })
  rutaVisualizacion: string;

  @Column({ name: 'tipo_mime' })
  tipoMime: string;

  @Column({ type: 'bigint', name: 'tamano_bytes' })
  tamanoBytes: number;

  @Column({
    type: 'enum',
    enum: EstadoSubida,
    default: EstadoSubida.SINCRONIZADO,
    name: 'estado_subida'
  })
  estadoSubida: EstadoSubida;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Column({ type: 'text', name: 'resumen_ia', nullable: true })
  resumenIa: string | null;

  @Column({ name: 'ruta_almacenamiento', nullable: true })
  rutaAlmacenamiento: string;

  @Column({ name: 'ocr_file_id', nullable: true, type: 'varchar' })
  ocrFileId: string | null;

  @OneToMany(() => TareaProcesamiento, (tarea) => tarea.archivoOrigen)
  tareasGeneradas: TareaProcesamiento[];
}
