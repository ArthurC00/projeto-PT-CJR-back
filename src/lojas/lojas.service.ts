import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { PrismaService } from '../database/prisma.service';
import { userInfo } from 'os';
import { error } from 'console';

@Injectable()
export class LojasService {
 
  constructor( private prisma: PrismaService) {}

  async create(createLojaDto: CreateLojaDto) {
    const loja = await this.prisma.lojas.create({
    
      createLojaDto,

    });
    return this.prisma.lojas.create({
     data: {createLojaDto},
     select: {createdAt:  true},
    })
  }

  async findAll() {
    return await this.prisma.lojas.findMany();
  }

  async findOne(id: Number) {
    const lojaExist = await this.prisma.lojas.findUnique({where: {id}});

    if (!lojaExist)
      throw new BadRequestException('A loja não existe');
    else 
      return lojaExist;
  }

  async update(id: number, UpdateLojaDto: UpdateLojaDto) {
    const lojaExist = this.prisma.lojas.findUnique({where: {id}});

    if (!lojaExist)
      throw new error('Loja não encontrada');

    return await this.prisma.lojas.update ({
      where: { id },
      data: CreateLojaDto,
      select: {
        id: true,
        nome: true,
        descricao: true,
        logo_url: true,
        sticker_url: true,
        banner_url: true,
      },

    });
  }

  async remove(id: number) {
    const lojaExist = await this.prisma.lojas.findUnique({where: {id}});

    if (!lojaExist)
      throw new error('loja não encontrada!');

    return await this.prisma.lojas.delete({where: {id}});
  }
    

}

