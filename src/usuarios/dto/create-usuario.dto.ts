import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'O username pode ter no máximo 50 caracteres' })
  username!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255, { message: 'O nome pode ter no máximo 255 caracteres' })
  nome!: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {message: 'A senha deve conter no mínimo 8 caracteres!'})
  @MaxLength(255, { message: 'A senha pode ter no máximo 255 caracteres' })
  senha_hash!: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, {
    message: 'A url da foto de perfil pode ter no máximo 255 caracteres',
  })
  foto_perfil_url?: string;
}
