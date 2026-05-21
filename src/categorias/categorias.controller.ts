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
import { AuthGuard } from '@nestjs/passport';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  // desativado para teste
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return await this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  // desativado para teste
  async findAll() {
    return await this.categoriasService.findAll();
  }

  @Get(':id')
  // @UseGuards(AuthGuard('jwt'))
  // desativado para teste
  async findOne(@Param('id') id: string) {
    return await this.categoriasService.findOne(+id);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard('jwt'))
  // desativado para teste
  async update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return await this.categoriasService.update(+id, updateCategoriaDto);
    // estava sem o await, o que estava fazendo a conexão encerrar antes de mostrar o erro caso a categoria a ser atualizada não fosse encontrada
  }

  @Delete(':id')
  // @UseGuards(AuthGuard('jwt'))
  // desativado para teste
  async remove(@Param('id') id: string) {
    return await this.categoriasService.remove(+id);
  }
}
