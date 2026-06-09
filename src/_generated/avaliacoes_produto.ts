import { Usuario } from './usuario';
import { produtos } from './produtos';
import { comentarios_avaliacao } from './comentarios_avaliacao';
import { ApiProperty } from '@nestjs/swagger';

export class avaliacoes_produto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  usuario_id: number;

  @ApiProperty({ type: () => Usuario })
  usuario: Usuario;

  @ApiProperty({ type: Number })
  produto_id: number;

  @ApiProperty({ type: () => produtos })
  produto: produtos;

  @ApiProperty({ isArray: true, type: () => comentarios_avaliacao })
  comentarios: comentarios_avaliacao[];

  @ApiProperty({ type: Number })
  nota: number;

  @ApiProperty({ type: String })
  comentario: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
