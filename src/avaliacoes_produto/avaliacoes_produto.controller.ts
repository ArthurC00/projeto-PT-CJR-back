import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AvaliacoesProdutoService } from './avaliacoes_produto.service';
import { CreateAvaliacoesProdutoDto } from './dto/create-avaliacoes_produto.dto';
import { UpdateAvaliacoesProdutoDto } from './dto/update-avaliacoes_produto.dto';

@Controller('avaliacoes-produto')
export class AvaliacoesProdutoController {
  constructor(
    private readonly avaliacoesProdutoService: AvaliacoesProdutoService,
  ) {}

  @Post()
  create(@Body() createAvaliacoesProdutoDto: CreateAvaliacoesProdutoDto) {
    return this.avaliacoesProdutoService.create(createAvaliacoesProdutoDto);
  }

  @Get()
  findAll() {
    return this.avaliacoesProdutoService.findAll();
  }

  @Get('/product/:id')
  findAllById(@Param('id') id: string) {
    return this.avaliacoesProdutoService.findAllById(+id);
  }

  @Get(':id') //id do comentario
  findOne(@Param('id') id: string) {
    return this.avaliacoesProdutoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAvaliacoesProdutoDto: UpdateAvaliacoesProdutoDto,
  ) {
    return this.avaliacoesProdutoService.update(
      +id,
      updateAvaliacoesProdutoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avaliacoesProdutoService.remove(+id);
  }
}
