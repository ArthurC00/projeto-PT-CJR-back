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
    const produto = await this.prisma.produtos.findMany()
    return produto;
  
  }

  async findOne(id: number) {
    const produto = await this.prisma.produtos.findUnique({
      where:{id}
    })
    return produto;

  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const produto = this.findOne(id);
    if (!produto){ 
      throw new Error;
    }
    return await this.prisma.produtos.update ({
      where:{id},
      data:{...updateProdutoDto}
    });
  }

  async remove(id: number) {
    const produto = this.findOne(id);
    if (!produto){ 
      throw new Error;
    }

    return await this.prisma.produtos.delete ({
      where:{id},
    });
  }
}
