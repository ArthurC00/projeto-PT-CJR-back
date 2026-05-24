import { produtos } from './produtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class categorias {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  nome: string;

  @ApiPropertyOptional({ type: Number })
  categoria_pai_id?: number;

  @ApiPropertyOptional({ type: () => categorias })
  categoria_pai?: categorias;

  @ApiProperty({ isArray: true, type: () => categorias })
  tipos: categorias[];

  @ApiProperty({ isArray: true, type: () => produtos })
  produto: produtos[];
}
