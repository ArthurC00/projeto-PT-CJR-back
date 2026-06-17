import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    senha_atual!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, {message: 'A senha deve conter no mínimo 8 caracteres!'})
    nova_senha!: string;
}