import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { email, senha_hash, ...userInfo } = createUsuarioDto;

    const userExist = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (userExist) throw new BadRequestException('O email já esta cadastrado');

    const hashed_password = await bcrypt.hash(senha_hash, 10);

    return this.prisma.usuario.create({
      data: { ...userInfo, email, senha_hash: hashed_password },
      select: { createdAt: true },
    });
  }

  async findAll() {
    return await this.prisma.usuario.findMany();
  }

  async findOne(id: number) {
    const userExist = await this.prisma.usuario.findUnique({ where: { id } });

    if (!userExist)
      throw new BadRequestException('Id inválido! O usuário não existe');

    return userExist;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const userExist = this.prisma.usuario.findUnique({ where: { id } });

    if (!userExist)
      throw new BadRequestException('Id inválido! O usuário não existe');

    const data = { ...updateUsuarioDto };

    if (data.senha_hash) {
      data.senha_hash = await bcrypt.hash(data.senha_hash, 10);
    }

    return this.prisma.usuario.update({
      where: { id },
      data: data,
      select: {
        id: true,
        nome: true,
        email: true,
        username: true,
        foto_perfil_url: true,
      },
    });
  }

  async remove(id: number) {
    const userExist = await this.prisma.usuario.findUnique({ where: { id } });

    if (!userExist)
      throw new BadRequestException('Id inválido! O usuário não existe');

    return this.prisma.usuario.delete({ where: { id } });
  }
}
