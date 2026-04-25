import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Archivo } from './archivo.entity';

export enum TipoTarea {
  A_WEBP = 'a_webp',
  MARCA_AGUA = 'marca_agua',
  OCR_TEXTO = 'ocr_texto'
}

export enum EstadoTarea {
  PENDIENTE = 'pendiente',
  PROCESANDO = 'procesando',
  COMPLETADO = 'completado',
  FALLIDO = 'fallido'
}

@Entity('tareas_procesamiento')
export class TareaProcesamiento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Archivo, (archivo) => archivo.tareasGeneradas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'archivo_origen_id' })
  archivoOrigen: Archivo;

  @ManyToOne(() => Archivo, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'archivo_resultado_id' })
  archivoResultado: Archivo;

  @Column({
    type: 'enum',
    enum: TipoTarea,
    name: 'tipo_tarea'
  })
  tipoTarea: TipoTarea;

  @Column({
    type: 'enum',
    enum: EstadoTarea,
    default: EstadoTarea.PENDIENTE,
    name: 'estado'
  })
  estado: EstadoTarea;

  @Column({ type: 'text', name: 'registro_errores', nullable: true })
  registroErrores: string;

  @CreateDateColumn({ name: 'fecha_inicio' })
  fechaInicio: Date;

  @Column({ type: 'timestamp', name: 'fecha_completado', nullable: true })
  fechaCompletado: Date;
}
