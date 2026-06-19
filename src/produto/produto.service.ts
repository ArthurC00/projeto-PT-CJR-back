import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto) {
    console.log(createProdutoDto);
    const { imagens, ...dadosProduto } = createProdutoDto;

    return await this.prisma.produtos.create({
      data: {
        nome: dadosProduto.nome,
        loja_id: dadosProduto.loja_id,
        categoria_id: dadosProduto.categoria_id,
        estoque: dadosProduto.estoque,
        preco: dadosProduto.preco,
        descricao: dadosProduto.descricao,
        imagens: imagens
          ? {
              create: imagens.map((img) => ({
                url_imagem: img.url_imagem,
                ordem: img.ordem,
              })),
            }
          : undefined,
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
        categoria: {
          select: {
            id: true,
            nome: true,
          },
        },
        imagens: {
          select: {
            url_imagem: true,
            ordem: true,
          },
          orderBy: { ordem: 'asc' },
        },
      },
    });
  }

  async findAllByUsuario(usuarioId: number) {
    return await this.prisma.produtos.findMany({
      where: {
        loja: {
          usuario_id: usuarioId,
        },
      },
      select: {
        id: true,
        nome: true,
        preco: true,
        estoque: true,
        descricao: true,
        loja_id: true,
        categoria_id: true,
        loja: {
          select: {
            banner_url: true,
          },
        },
        categoria: {
          select: {
            id: true,
            nome: true,
          },
        },
        imagens: {
          select: {
            url_imagem: true,
            ordem: true,
          },
          orderBy: { ordem: 'asc' },
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
        loja: {
          select: { usuario_id: true, banner_url: true },
        },
        categoria: {
          select: {
            id: true,
            nome: true,
          },
        },
        imagens: {
          select: {
            id: true,
            url_imagem: true,
            ordem: true,
          },
          orderBy: { ordem: 'asc' },
        },
      },
    });

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    return produto;
  }

  async searchProducts(query: string) {
    if (!query || query.trim() === '') return [];

    return this.prisma.produtos.findMany({
      where: {
        OR: [
          { nome: { contains: query, mode: 'insensitive' } },
          { descricao: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 20,
      orderBy: { nome: 'asc' },
    });
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.findOne(id);
    if (!produto) {
      throw new Error();
    }

    const { imagens, ...dadosProduto } = updateProdutoDto;

    return await this.prisma.produtos.update({
      where: { id },
      data: {
        nome: dadosProduto.nome,
        loja_id: dadosProduto.loja_id,
        categoria_id: dadosProduto.categoria_id,
        estoque: dadosProduto.estoque,
        preco: dadosProduto.preco,
        descricao: dadosProduto.descricao,
        imagens: imagens
          ? {
              deleteMany: {},
              create: imagens.map((img) => ({
                url_imagem: img.url_imagem,
                ordem: img.ordem,
              })),
            }
          : undefined,
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
