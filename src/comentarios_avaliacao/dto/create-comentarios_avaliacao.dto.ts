import { IsNotEmpty, IsString, MaxLength, IsNumber, IsOptional } from "class-validator";

export class CreateComentariosAvaliacaoDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255, {message: 'O comentário pode ter no máximo 255 caracteres' })
    conteudo!: string;

    @IsNumber()
    @IsNotEmpty()
    usuario_id!: number;

    @IsOptional()
    @IsNumber()
    avaliacao_loja_id?: number;

    @IsOptional()
    @IsNumber()
    avaliacao_produto_id?: number;
}
