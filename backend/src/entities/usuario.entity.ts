import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IntegracionNube } from './integracion-nube.entity';
import { Carpeta } from './carpeta.entity';
import { Archivo } from './archivo.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, name: 'correo_electronico' })
  correoElectronico: string;

  @Column({ name: 'contrasena_hash' })
  contrasenaHash: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;

  @OneToMany(() => IntegracionNube, (integracion) => integracion.usuario)
  integracionesNube: IntegracionNube[];

  @OneToMany(() => Carpeta, (carpeta) => carpeta.usuario)
  carpetas: Carpeta[];

  @OneToMany(() => Archivo, (archivo) => archivo.usuario)
  archivos: Archivo[];
}
