import { Module } from '@nestjs/common';
import { ComentariosAvaliacaoService } from './comentarios_avaliacao.service';
import { ComentariosAvaliacaoController } from './comentarios_avaliacao.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ComentariosAvaliacaoController],
  providers: [ComentariosAvaliacaoService, PrismaService],
})
export class ComentariosAvaliacaoModule {}
