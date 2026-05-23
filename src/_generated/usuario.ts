import { lojas } from './lojas';
import { avaliacoes_loja } from './avaliacoes_loja';
import { avaliacoes_produto } from './avaliacoes_produto';
import { comentarios_avaliacao } from './comentarios_avaliacao';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Usuario {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  nome: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  senha_hash: string;

  @ApiPropertyOptional({ type: String })
  foto_perfil_url?: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ isArray: true, type: () => lojas })
  lojas: lojas[];

  @ApiProperty({ isArray: true, type: () => avaliacoes_loja })
  avaliacoes_loja: avaliacoes_loja[];

  @ApiProperty({ isArray: true, type: () => avaliacoes_produto })
  avaliacoes_produto: avaliacoes_produto[];

  @ApiProperty({ isArray: true, type: () => comentarios_avaliacao })
  comentarios_avaliacao: comentarios_avaliacao[];
}
