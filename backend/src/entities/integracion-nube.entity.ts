import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('integraciones_nube')
export class IntegracionNube {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.integracionesNube, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ comment: "Ej: 'dropbox', 'gdrive'" })
  proveedor: string;

  @Column({ name: 'id_cuenta_nube', comment: "ID del usuario en proveedor" })
  idCuentaNube: string;

  @Column({ name: 'token_acceso' })
  tokenAcceso: string;

  @Column({ name: 'token_refresco', nullable: true })
  tokenRefresco: string;

  @Column({ name: 'cursor_webhook', nullable: true, comment: "Para saber desde qué evento leer" })
  cursorWebhook: string;
}
