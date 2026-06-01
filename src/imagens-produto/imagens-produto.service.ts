import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImagensProdutoDto } from './dto/create-imagens-produto.dto';
import { UpdateImagensProdutoDto } from './dto/update-imagens-produto.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ImagensProdutoService {
  constructor(private prisma: PrismaService) {}

  create(createImagensProdutoDto: CreateImagensProdutoDto) {
    return 'This action adds a new imagensProduto';
  }

  findAll() {
    return `This action returns all imagensProduto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imagensProduto`;
  }

  update(id: number, updateImagensProdutoDto: UpdateImagensProdutoDto) {
    return `This action updates a #${id} imagensProduto`;
  }

  remove(id: number) {
    return `This action removes a #${id} imagensProduto`;
  }

  async salvarImagem(produto_id: number, url_imagem: string) {
    const produtoExiste = await this.prisma.produtos.findUnique({
      where: { id: produto_id },
    });

    if (!produtoExiste) {
      throw new NotFoundException('Produto não encontrado');
    }

    const ultimaImagem = await this.prisma.imagens_produto.findFirst({
      where: { produto_id },
      orderBy: { ordem: 'desc' },
    });

    const novaOrdem = ultimaImagem ? ultimaImagem.ordem + 1 : 1;

    const novaImagem = await this.prisma.imagens_produto.create({
      data: {
        url_imagem,
        ordem: novaOrdem,
        produto_id,
      },
    });

    return novaImagem;
  }
}
