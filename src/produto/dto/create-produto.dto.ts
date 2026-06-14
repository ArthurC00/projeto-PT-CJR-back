import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  IsArray,
  IsOptional,
  ValidateNested,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class ImagemDto {
  @IsString()
  @IsNotEmpty()
  url_imagem!: string;

  @IsInt()
  @IsNotEmpty()
  ordem!: number;
}

import { Type } from 'class-transformer';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255, {
    message: 'O nome do produto pode ter no máximo 255 caracteres',
  })
  nome!: string;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  loja_id!: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  categoria_id!: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  estoque!: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  preco!: number;

  @IsString()
  @IsNotEmpty()
  descricao!: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ImagemDto)
  imagens?: ImagemDto[];
}
