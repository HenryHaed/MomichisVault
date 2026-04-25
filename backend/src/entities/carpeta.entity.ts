import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Archivo } from './archivo.entity';

export enum TipoCarpeta {
  ENTRADA_MAGICA = 'entrada_magica',
  SALIDA_PROCESADA = 'salida_procesada',
  ESTANDAR = 'estandar'
}

@Entity('carpetas')
export class Carpeta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.carpetas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Carpeta, (carpeta) => carpeta.subcarpetas, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carpeta_padre_id' })
  carpetaPadre: Carpeta;

  @OneToMany(() => Carpeta, (carpeta) => carpeta.carpetaPadre)
  subcarpetas: Carpeta[];

  @Column()
  nombre: string;

  @Column({
    type: 'enum',
    enum: TipoCarpeta,
    default: TipoCarpeta.ESTANDAR,
    name: 'tipo_carpeta'
  })
  tipoCarpeta: TipoCarpeta;

  @Column({ name: 'id_carpeta_nube', nullable: true })
  idCarpetaNube: string;

  @OneToMany(() => Archivo, (archivo) => archivo.carpeta)
  archivos: Archivo[];
}
