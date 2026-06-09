import { Usuario } from './usuario';
import { lojas } from './lojas';
import { comentarios_avaliacao } from './comentarios_avaliacao';
import { ApiProperty } from '@nestjs/swagger';

export class avaliacoes_loja {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  usuario_id: number;

  @ApiProperty({ type: () => Usuario })
  usuario: Usuario;

  @ApiProperty({ type: Number })
  loja_id: number;

  @ApiProperty({ type: () => lojas })
  loja: lojas;

  @ApiProperty({ type: Number })
  nota: number;

  @ApiProperty({ type: String })
  comentario: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ isArray: true, type: () => comentarios_avaliacao })
  comentarios: comentarios_avaliacao[];
}
