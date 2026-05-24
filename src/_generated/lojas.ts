import { Usuario } from './usuario';
import { avaliacoes_loja } from './avaliacoes_loja';
import { produtos } from './produtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class lojas {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  usuario_id: number;

  @ApiProperty({ type: () => Usuario })
  usuario: Usuario;

  @ApiProperty({ type: String })
  nome: string;

  @ApiProperty({ type: String })
  descricao: string;

  @ApiPropertyOptional({ type: String })
  logo_url?: string;

  @ApiPropertyOptional({ type: String })
  banner_url?: string;

  @ApiPropertyOptional({ type: String })
  sticker_url?: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ isArray: true, type: () => avaliacoes_loja })
  avaliacoes: avaliacoes_loja[];

  @ApiProperty({ isArray: true, type: () => produtos })
  produtos: produtos[];
}
