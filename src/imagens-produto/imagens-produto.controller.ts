import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ParseIntPipe,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImagensProdutoService } from './imagens-produto.service';
import { CreateImagensProdutoDto } from './dto/create-imagens-produto.dto';
import { UpdateImagensProdutoDto } from './dto/update-imagens-produto.dto';

@Controller('produtos/:produto_id/imagens')
export class ImagensProdutoController {
  constructor(private readonly imagensProdutoService: ImagensProdutoService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadImagem(
    @Param('produto_id', ParseIntPipe) produto_id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const urlLocal = `${baseUrl}/uploads/${file.filename}`;

    return this.imagensProdutoService.salvarImagem(produto_id, urlLocal);
  }

  @Get()
  findAll() {
    return this.imagensProdutoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagensProdutoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateImagensProdutoDto: UpdateImagensProdutoDto,
  ) {
    return this.imagensProdutoService.update(+id, updateImagensProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagensProdutoService.remove(+id);
  }
}
