import { Module } from '@nestjs/common';
import { AvaliacoesLojaService } from './avaliacoes_loja.service';
import { AvaliacoesLojaController } from './avaliacoes_loja.controller';
import { PrismaService } from '../../prisma/prisma.service'; 


@Module({
  controllers: [AvaliacoesLojaController],
  providers: [AvaliacoesLojaService, PrismaService],
})
export class AvaliacoesLojaModule {}
