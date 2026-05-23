import { produtos } from './produtos';
import { ApiProperty } from '@nestjs/swagger';

export class imagens_produto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  url_imagem: string;

  @ApiProperty({ type: Number })
  ordem: number;

  @ApiProperty({ type: Number })
  produto_id: number;

  @ApiProperty({ type: () => produtos })
  produto: produtos;
}
