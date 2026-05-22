import { Injectable } from '@nestjs/common';
import { CreateAvaliacoesProdutoDto } from './dto/create-avaliacoes_produto.dto';
import { UpdateAvaliacoesProdutoDto } from './dto/update-avaliacoes_produto.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AvaliacoesProdutoService {
  constructor (private readonly prisma: PrismaService){}

  async create(createAvaliacoesProdutoDto: CreateAvaliacoesProdutoDto) {
      return await this.prisma.avaliacoes_produto.create({
        data: {
          ...createAvaliacoesProdutoDto
        }
      });
    }

  async findAll() {
    const avaliacoes_produto = await this.prisma.avaliacoes_produto.findMany()
    return avaliacoes_produto;
  }

  async findOne(id: number) {
    const avaliacoes_produto = await this.prisma.avaliacoes_produto.findUnique({
      where:{id}
    })
    return avaliacoes_produto;
  }

  async update(id: number, updateAvaliacoesProdutoDto: UpdateAvaliacoesProdutoDto) {
    const avaliacoes_produto = this.findOne(id);
    if (!avaliacoes_produto){
      throw new Error;
    }
    return await this.prisma.avaliacoes_produto.update ({
      where:{id},
      data:{...updateAvaliacoesProdutoDto},
    });
  }

  async remove(id: number) {
    const avaliacoes_produto = this.findOne(id);
    if (!avaliacoes_produto){
      throw new Error;
    }
    return await this.prisma.avaliacoes_produto.delete({
      where:{id},
    });
  }
}
