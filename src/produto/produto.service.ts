import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class ProdutoService {
  constructor (private readonly prisma: PrismaService){}

  async create(createProdutoDto: CreateProdutoDto) {
  return await this.prisma.produtos.create({
    data: {
      ...createProdutoDto 
    }
  });
}

  async findAll() {
    const produto = await this.prisma.produtos.findMany
    return `This action returns all produto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
