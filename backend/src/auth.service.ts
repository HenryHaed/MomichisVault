import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) {}

  async login(email: string, password: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { correoElectronico: email }
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales invalidas.');
    }

    const isValid = await bcrypt.compare(password, usuario.contrasenaHash);
    if (!isValid) {
      throw new UnauthorizedException('Credenciales invalidas.');
    }

    return {
      ok: true,
      usuario: {
        id: usuario.id,
        correoElectronico: usuario.correoElectronico
      }
    };
  }
}
