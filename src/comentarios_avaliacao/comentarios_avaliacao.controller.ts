import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComentariosAvaliacaoService } from './comentarios_avaliacao.service';
import { CreateComentariosAvaliacaoDto } from './dto/create-comentarios_avaliacao.dto';
import { UpdateComentariosAvaliacaoDto } from './dto/update-comentarios_avaliacao.dto';

@Controller('comentarios-avaliacao')
export class ComentariosAvaliacaoController {
  constructor(private readonly comentariosAvaliacaoService: ComentariosAvaliacaoService) {}

  @Post()
  create(@Body() createComentariosAvaliacaoDto: CreateComentariosAvaliacaoDto) {
    return this.comentariosAvaliacaoService.create(createComentariosAvaliacaoDto);
  }

  @Get()
  findAll() {
    return this.comentariosAvaliacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentariosAvaliacaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComentariosAvaliacaoDto: UpdateComentariosAvaliacaoDto) {
    return this.comentariosAvaliacaoService.update(+id, updateComentariosAvaliacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentariosAvaliacaoService.remove(+id);
  }
}
