import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvaliacoesLojaService } from './avaliacoes_loja.service';
import { CreateAvaliacoesLojaDto } from './dto/create-avaliacoes_loja.dto';
import { UpdateAvaliacoesLojaDto } from './dto/update-avaliacoes_loja.dto';

@Controller('avaliacoes-loja')
export class AvaliacoesLojaController {
  constructor(private readonly avaliacoesLojaService: AvaliacoesLojaService) {}

  @Post()
  create(@Body() createAvaliacoesLojaDto: CreateAvaliacoesLojaDto) {
    return this.avaliacoesLojaService.create(createAvaliacoesLojaDto);
  }

  @Get()
  findAll() {
    return this.avaliacoesLojaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avaliacoesLojaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvaliacoesLojaDto: UpdateAvaliacoesLojaDto) {
    return this.avaliacoesLojaService.update(+id, updateAvaliacoesLojaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avaliacoesLojaService.remove(+id);
  }
}
