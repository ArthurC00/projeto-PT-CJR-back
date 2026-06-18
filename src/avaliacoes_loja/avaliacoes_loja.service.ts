import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvaliacoesLojaDto } from './dto/create-avaliacoes_loja.dto';
import { UpdateAvaliacoesLojaDto } from './dto/update-avaliacoes_loja.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AvaliacoesLojaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAvaliacoesLojaDto: CreateAvaliacoesLojaDto) {
    return await this.prisma.avaliacoes_loja.create({
      data: {
        ...createAvaliacoesLojaDto,
      },
    });
  }

  async findAll() {
    const avaliacoes_loja = await this.prisma.avaliacoes_loja.findMany();
    return avaliacoes_loja;
  }

  async findOne(id: number) {
    const avaliacao = await this.prisma.avaliacoes_loja.findUnique({
      where: { id },
    });
    if (!avaliacao) {
      throw new NotFoundException(`Avaliação com o ID ${id} não encontrada.`);
    }
    return avaliacao;
  }

  async findAllByLoja(lojaId: number) {
    const avaliacoes = await this.prisma.avaliacoes_loja.findMany({
      where: {
        loja_id: lojaId,
      },
      include: {
        loja: {
          select: {
            id: true,
            nome: true,
            logo_url: true,
            banner_url: true,
          },
        },
        usuario: {
          select: {
            id: true,
            nome: true,
            foto_perfil_url: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log(avaliacoes);
    return avaliacoes;
  }

  async update(id: number, updateAvaliacoesLojaDto: UpdateAvaliacoesLojaDto) {
    const avaliacoes_loja = this.findOne(id);
    if (!avaliacoes_loja) {
      throw new Error();
    }
    return await this.prisma.avaliacoes_loja.update({
      where: { id },
      data: { ...updateAvaliacoesLojaDto },
    });
  }

  async remove(id: number) {
    const avaliacoes_loja = this.findOne(id);
    if (!avaliacoes_loja) {
      throw new Error();
    }
    return await this.prisma.avaliacoes_loja.delete({
      where: { id },
    });
  }
}
