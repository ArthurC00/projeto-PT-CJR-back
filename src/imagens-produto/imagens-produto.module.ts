import { Module } from '@nestjs/common';
import { ImagensProdutoService } from './imagens-produto.service';
import { ImagensProdutoController } from './imagens-produto.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ImagensProdutoController],
  providers: [ImagensProdutoService, PrismaService],
})
export class ImagensProdutoModule {}
