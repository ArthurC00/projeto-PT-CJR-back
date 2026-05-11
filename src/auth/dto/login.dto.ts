import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LogindDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255, { message: 'A senha pode ter no máximo 255 caracteres' })
  senha_hash!: string;
}
