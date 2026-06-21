import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ComentariosAvaliacaoService } from './comentarios_avaliacao.service';
import { CreateComentariosAvaliacaoDto } from './dto/create-comentarios_avaliacao.dto';
import { UpdateComentariosAvaliacaoDto } from './dto/update-comentarios_avaliacao.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comentarios-avaliacao')
export class ComentariosAvaliacaoController {
  constructor(
    private readonly comentariosAvaliacaoService: ComentariosAvaliacaoService,
  ) {}

  @Post()
  async create(
    @Body() createComentariosAvaliacaoDto: CreateComentariosAvaliacaoDto,
  ) {
    return await this.comentariosAvaliacaoService.create(
      createComentariosAvaliacaoDto,
    );
  }

  @Get('/all/:id')
  async findAll(@Param('id') id: number) {
    return await this.comentariosAvaliacaoService.findAll(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.comentariosAvaliacaoService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateComentariosAvaliacaoDto: UpdateComentariosAvaliacaoDto,
  ) {
    return await this.comentariosAvaliacaoService.update(
      +id,
      updateComentariosAvaliacaoDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.comentariosAvaliacaoService.remove(+id);
  }
}
