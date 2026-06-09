import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class CreateProdutoDto {

@IsString()
@IsNotEmpty()
@MaxLength(50, {message: 'O nome da loja pode ter no máximo 50 caracteres' })
nome!: string;

@IsInt()
@IsNotEmpty()
loja_id!: number;

@IsInt()
@IsNotEmpty()
categoria_id!: number;

@IsInt()
@IsNotEmpty()
estoque!: number;

@IsNumber()
@IsNotEmpty()
preco!: number;

@IsString()
@IsNotEmpty()
@MaxLength(255, {message: 'O preço da loja pode ter no máximo 255 caracteres' })
descricao!: string;
}
