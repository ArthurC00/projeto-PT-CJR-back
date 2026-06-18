import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { LojasService } from './lojas.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';

@Controller('lojas')
export class LojasController {
  constructor(private readonly lojasService: LojasService) {}

  @Post('/criar')
  create(@Body() createLojaDto: CreateLojaDto) {
    return this.lojasService.create(createLojaDto);
  }

  @Get()
  findAll(@Query('usuario_id') usuarioId?: string) {
    if (usuarioId) {
      return this.lojasService.findAllByUsuario(Number(usuarioId));
    }
    return this.lojasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lojasService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLojaDto: UpdateLojaDto) {
    return this.lojasService.update(+id, updateLojaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lojasService.remove(+id);
  }
}
