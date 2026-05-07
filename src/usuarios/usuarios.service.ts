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

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
