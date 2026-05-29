import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto) {
    console.log(createProdutoDto);
    return await this.prisma.produtos.create({
      data: {
        ...createProdutoDto,
      },
      select: { createdAt: true },
    });
  }

  async findAll() {
    const produto = await this.prisma.produtos.findMany({
      select: {
        id: true,
        nome: true,
        preco: true,
        estoque: true,
        descricao: true,
        loja_id: true,
        categoria_id: true,
      },
    });
    return produto;
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
      },
    });
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
    const produto = this.findOne(id);
    if (!produto) {
      throw new Error();
    }
    return await this.prisma.produtos.update({
      where: { id },
      data: { ...updateProdutoDto },
    });
  }

  async remove(id: number) {
    const produto = this.findOne(id);
    if (!produto) {
      throw new Error();
    }

    return await this.prisma.produtos.delete({
      where: { id },
    });
  }
}
