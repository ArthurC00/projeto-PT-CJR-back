import { Usuario } from './usuario';
import { avaliacoes_loja } from './avaliacoes_loja';
import { avaliacoes_produto } from './avaliacoes_produto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class comentarios_avaliacao {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  conteudo: string;

  @ApiProperty({ type: Number })
  usuario_id: number;

  @ApiProperty({ type: () => Usuario })
  usuario: Usuario;

  @ApiPropertyOptional({ type: Number })
  avaliacao_loja_id?: number;

  @ApiPropertyOptional({ type: () => avaliacoes_loja })
  avaliacao_loja?: avaliacoes_loja;

  @ApiPropertyOptional({ type: Number })
  avaliacao_produto_id?: number;

  @ApiPropertyOptional({ type: () => avaliacoes_produto })
  avaliacao_produto?: avaliacoes_produto;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
