import {
  isEmpty,
  IsInt,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isString,
  MaxLength,
} from 'class-validator';

export class CreateLojaDto {
  @IsInt()
  @IsNumber()
  usuario_id!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nome!: string;

  @IsString()
  descricao!: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  logo_url?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  sticker_url?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  banner_url?: string;
}
