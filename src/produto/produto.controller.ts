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
      const imagensUrls = files.map(
        (file) => `http://localhost:3001/uploads/${file.filename}`,
      );
      createProdutoDto.imagens = imagensUrls;
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
    let urlsFinais: string[] = [];

    if (updateProdutoDto.imagens_mantidas) {
      urlsFinais = Array.isArray(updateProdutoDto.imagens_mantidas)
        ? updateProdutoDto.imagens_mantidas
        : [updateProdutoDto.imagens_mantidas];
    }

    if (files && files.length > 0) {
      const novasUrls = files.map(
        (file) => `http://localhost:3001/uploads/${file.filename}`,
      );
      urlsFinais = [...urlsFinais, ...novasUrls];
    }

    if (urlsFinais.length > 0) {
      updateProdutoDto.imagens = urlsFinais;
    }

    delete updateProdutoDto.imagens_mantidas;

    updateProdutoDto.categoria_id = Number(updateProdutoDto.categoria_id);
    updateProdutoDto.preco = Number(updateProdutoDto.preco);
    updateProdutoDto.estoque = Number(updateProdutoDto.estoque);

    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
