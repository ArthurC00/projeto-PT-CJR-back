import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { PrismaService } from '../../prisma/prisma.service';

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

  async findAll() {
    return await this.prisma.lojas.findMany({
      select: {
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
        nome: true,
        descricao: true,
        logo_url: true,
        banner_url: true,
      },
    });
  }

  update(id: number, updateLojaDto: UpdateLojaDto) {
    return `This action updates a #${id} loja`;
  }

  remove(id: number) {
    return `This action removes a #${id} loja`;
  }
}
