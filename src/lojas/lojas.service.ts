import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class LojasService {
  constructor(private prisma: PrismaService) {}

  async create(createLojaDto: CreateLojaDto) {
    const { nome, descricao, logo_url, banner_url, sticker_url, ...LojaInfo } =
      createLojaDto;
    const lojaExiste = await this.prisma.lojas.findFirst({
      where: { nome },
    });

    if (lojaExiste) {
      throw new BadRequestException(`A loja já existe!`);
    }

    return await this.prisma.lojas.create({
      data: {
        ...createLojaDto,
      },
      select: { createdAt: true },
    });
  }

  async findAllByUsuario(usuarioId: number) {
    return await this.prisma.lojas.findMany({
      where: {
        usuario_id: usuarioId,
      },
      select: {
        id: true,
        nome: true,
        descricao: true,
        logo_url: true,
        banner_url: true,
        sticker_url: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.lojas.findMany({
      select: {
        id: true,
        nome: true,
        descricao: true,
        logo_url: true,
        banner_url: true,
      },
    });
  }

  async findOne(id: number) {
    const lojaExiste = await this.prisma.lojas.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        descricao: true,
        logo_url: true,
        banner_url: true,
        usuario: {
          select: {
            id: true,
            nome: true,
            foto_perfil_url: true,
          },
        },
      },
    });
    if (!lojaExiste) {
      throw new NotFoundError(`Loja ${id} não existe`);
    }

    return lojaExiste;
  }

  update(id: number, updateLojaDto: UpdateLojaDto) {
    return `This action updates a #${id} loja`;
  }

  remove(id: number) {
    return `This action removes a #${id} loja`;
  }
}
