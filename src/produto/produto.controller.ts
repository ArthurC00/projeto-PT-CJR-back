import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `${uniqueSuffix}${ext}`);
    },
  }),
};

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor(multerConfig))
  create(
    @Body() createProdutoDto: CreateProdutoDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (files && files.length > 0) {
      const baseUrl = process.env.BACKEND_URL || 'http://localhost:3001';
      const imagensFormatadas = files.map((file, index) => ({
        url_imagem: `${baseUrl}/uploads/${file.filename}`,
        ordem: index + 1,
      }));

      createProdutoDto.imagens = imagensFormatadas;
    }

    return this.produtoService.create(createProdutoDto);
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.produtoService.searchProducts(query);
  }

  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get('/loja/:id')
  findAllByLoja(@Param('id') lojaId: string) {
    return this.produtoService.findAllByLoja(+lojaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor(multerConfig))
  update(
    @Param('id') id: string,
    @Body() updateProdutoDto: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const urls: string[] = [];

    const oldImgs = updateProdutoDto.oldImg
      ? Array.isArray(updateProdutoDto.oldImg)
        ? updateProdutoDto.oldImg
        : [updateProdutoDto.oldImg]
      : [];

    let index = 0;

    const baseUrl = process.env.BACKEND_URL || 'http://localhost:3001';

    for (let i = 0; i < 4; i++) {
      const fieldName = i === 0 ? 'fotos_principais' : `foto_secundaria_${i}`;
      const file = files?.find((f) => f.fieldname === fieldName);

      if (file) {
        urls.push(`${baseUrl}/uploads/${file.filename}`);
      } else if (index < oldImgs.length) {
        urls.push(oldImgs[index]);
        index++;
      }
    }

    if (urls.length > 0) {
      updateProdutoDto.imagens = urls.map((url, index) => ({
        url_imagem: url,
        ordem: index + 1,
      }));
    }

    delete updateProdutoDto.oldImg;

    if (updateProdutoDto.categoria_id !== undefined) {
      updateProdutoDto.categoria_id = Number(updateProdutoDto.categoria_id);
    } else {
      delete updateProdutoDto.categoria_id;
    }

    if (updateProdutoDto.preco !== undefined) {
      updateProdutoDto.preco = Number(updateProdutoDto.preco);
    } else {
      delete updateProdutoDto.preco;
    }

    if (updateProdutoDto.estoque !== undefined) {
      updateProdutoDto.estoque = Number(updateProdutoDto.estoque);
    } else {
      delete updateProdutoDto.estoque;
    }

    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Get('usuario/:usuarioId')
  findAllByUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    return this.produtoService.findAllByUsuario(usuarioId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
