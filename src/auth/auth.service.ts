import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LogindDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: LogindDto) {
    const { email, senha_hash } = data;
    const user = await this.prisma.usuario.findUnique({ where: { email } });

    if (!user) throw new BadRequestException('O email não está registrado');

    const isPass = await bcrypt.compare(senha_hash, user.senha_hash);

    if (!isPass) throw new BadRequestException('A senha está incorreta');

    const payload = {
      userId: user.id,
      nome: user.nome,
      email: user.email,
      username: user.username,
      foto_perfil_url: user.foto_perfil_url,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
