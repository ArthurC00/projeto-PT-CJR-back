import { lojas } from './lojas';
import { categorias } from './categorias';
import { avaliacoes_produto } from './avaliacoes_produto';
import { imagens_produto } from './imagens_produto';
import { ApiProperty } from '@nestjs/swagger';

export class produtos {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  loja_id: number;

  @ApiProperty({ type: () => lojas })
  loja: lojas;

  @ApiProperty({ type: Number })
  categoria_id: number;

  @ApiProperty({ type: () => categorias })
  categoria: categorias;

  @ApiProperty({ type: String })
  nome: string;

  @ApiProperty({ type: Number })
  preco: number;

  @ApiProperty({ type: Number })
  estoque: number;

  @ApiProperty({ type: String })
  descricao: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ isArray: true, type: () => avaliacoes_produto })
  avaliacoes: avaliacoes_produto[];

  @ApiProperty({ isArray: true, type: () => imagens_produto })
  imagens: imagens_produto[];
}
