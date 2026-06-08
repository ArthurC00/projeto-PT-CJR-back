import {IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
export class CreateLojaDto { 

  @IsInt()
  @IsNumber()
  usuario_id!: number;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  nome!: string;

  @IsOptional()
  @IsString()
  descricao!: string;
  
  @IsOptional()
  @IsString()
  logo_url?: string;

  @IsOptional()
  @IsString()
  banner_url?: string;

  @IsOptional()
  @IsString()
  sticker_url?: string;

}


 
