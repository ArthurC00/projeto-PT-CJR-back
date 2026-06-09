import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const { imagens, ...produtoData } = createProdutoDto;

    return await this.prisma.produtos.create({
      data: {
        ...produtoData, // Passa os campos normais

        ...(imagens && imagens.length > 0
          ? {
              imagens: {
                create: imagens.map((url, index) => ({
                  url_imagem: url,
                  ordem: index + 1,
                })),
              },
            }
          : {}),
      },
      select: { createdAt: true },
    });
  }

  async findAll() {
    return await this.prisma.produtos.findMany({
      select: {
        id: true,
        nome: true,
        preco: true,
        estoque: true,
        descricao: true,
        loja_id: true,
        categoria_id: true,
        imagens: {
          orderBy: { ordem: 'asc' },
          select: {
            id: true,
            url_imagem: true,
            ordem: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const produto = await this.prisma.produtos.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        preco: true,
        estoque: true,
        descricao: true,
        loja_id: true,
        categoria_id: true,
        categoria: {
          select: {
            nome: true,
          },
        },
        imagens: {
          orderBy: { ordem: 'asc' },
          select: {
            id: true,
            url_imagem: true,
            ordem: true,
          },
        },
      },
    });

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const { imagens, ...produtoData } = updateProdutoDto;

    return await this.prisma.produtos.update({
      where: { id },
      data: {
        ...produtoData,
        ...(imagens
          ? {
              imagens: {
                deleteMany: {},
                create: imagens.map((url, index) => ({
                  url_imagem: url,
                  ordem: index + 1,
                })),
              },
            }
          : {}),
      },
    });
  }

  async remove(id: number) {
    const produto = await this.findOne(id);

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    return await this.prisma.produtos.delete({
      where: { id },
    });
  }
}
