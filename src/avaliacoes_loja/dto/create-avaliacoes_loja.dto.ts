import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateAvaliacoesLojaDto {
  @IsInt()
  @IsNotEmpty()
  usuario_id!: number;

  @IsInt()
  @IsNotEmpty()
  loja_id!: number;

  @IsInt()
  @IsNotEmpty()
  nota!: number;

  @IsString()
  @IsNotEmpty()
  comentario!: string;
}
