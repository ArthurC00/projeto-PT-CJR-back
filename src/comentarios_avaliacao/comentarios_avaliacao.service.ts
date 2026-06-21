import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateComentariosAvaliacaoDto } from './dto/create-comentarios_avaliacao.dto';
import { UpdateComentariosAvaliacaoDto } from './dto/update-comentarios_avaliacao.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ComentariosAvaliacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createComentariosAvaliacaoDto: CreateComentariosAvaliacaoDto) {
    const { conteudo, usuario_id, avaliacao_loja_id, avaliacao_produto_id } =
      createComentariosAvaliacaoDto;

    // dois caminhos: comentário numa avaliação de produto OU comentário numa avaliação de loja

    if (avaliacao_loja_id) {
      // se tiver recebido o ID de uma avaliação de loja
      const avaliacaoExiste = await this.prisma.avaliacoes_loja.findUnique({
        where: { id: avaliacao_loja_id },
      });

      if (!avaliacaoExiste) {
        throw new BadRequestException(
          'A avaliação de loja especificada não existe.',
        );
      }
      return await this.prisma.comentarios_avaliacao.create({
        data: { conteudo, usuario_id, avaliacao_loja_id },
        select: {
          id: true,
          usuario_id: true,
          avaliacao_loja_id: true,
          conteudo: true,
        },
      });
    } else if (avaliacao_produto_id) {
      // se tiver recebido o ID de uma avaliação de produto
      const avaliacaoExiste = await this.prisma.avaliacoes_produto.findUnique({
        where: { id: avaliacao_produto_id },
      });

      if (!avaliacaoExiste) {
        throw new BadRequestException(
          'A avaliação de produto especificada não existe.',
        );
      }

      return await this.prisma.comentarios_avaliacao.create({
        data: { conteudo, usuario_id, avaliacao_produto_id },
        select: {
          id: true,
          usuario_id: true,
          avaliacao_produto_id: true,
          conteudo: true,
        },
      });
    } else {
      throw new BadRequestException('ID de avaliação não recebido.');
    }
  }

  async findAll(id: number) {
    return await this.prisma.comentarios_avaliacao.findMany({
      where: {
        avaliacao_loja_id: id,
      },
      select: {
        id: true,
        usuario_id: true,
        avaliacao_loja_id: true,
        avaliacao_produto_id: true,
        conteudo: true,
        usuario: {
          select: {
            nome: true,
            foto_perfil_url: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const comentarioExiste = await this.prisma.comentarios_avaliacao.findUnique(
      {
        where: { id },
        select: {
          id: true,
          usuario_id: true,
          avaliacao_loja_id: true,
          avaliacao_produto_id: true,
          conteudo: true,
        },
      },
    );

    if (!comentarioExiste) {
      throw new BadRequestException('Comentário não encontrado.');
    }
    return comentarioExiste;
  }

  async update(
    id: number,
    updateComentariosAvaliacaoDto: UpdateComentariosAvaliacaoDto,
  ) {
    const comentarioExiste = await this.prisma.comentarios_avaliacao.findUnique(
      { where: { id } },
    );

    if (!comentarioExiste) {
      throw new BadRequestException('Comentário não encontrado.');
    }

    const data = { ...updateComentariosAvaliacaoDto };

    return await this.prisma.comentarios_avaliacao.update({
      where: { id },
      data: data,
      select: {
        id: true,
        usuario_id: true,
        avaliacao_loja_id: true,
        avaliacao_produto_id: true,
        conteudo: true,
      },
    });
  }

  async remove(id: number) {
    const comentarioExiste = await this.prisma.comentarios_avaliacao.findUnique(
      { where: { id } },
    );

    if (!comentarioExiste) {
      throw new BadRequestException('Comentário não encontrado.');
    }

    return await this.prisma.comentarios_avaliacao.delete({
      where: { id },
      select: {
        id: true,
        usuario_id: true,
        avaliacao_loja_id: true,
        avaliacao_produto_id: true,
        conteudo: true,
      },
    });
  }
}
