import { Module } from '@nestjs/common';
import { ComentariosAvaliacaoService } from './comentarios_avaliacao.service';
import { ComentariosAvaliacaoController } from './comentarios_avaliacao.controller';

@Module({
  controllers: [ComentariosAvaliacaoController],
  providers: [ComentariosAvaliacaoService],
})
export class ComentariosAvaliacaoModule {}
