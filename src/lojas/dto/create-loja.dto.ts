import {
  isEmpty,
  IsInt,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  isString,
  MaxLength,
} from 'class-validator';

export class CreateLojaDto {
  /*id          Int     @id @default(autoincrement())

  usuario_id  Int
  usuario     Usuario           @relation("donoDaLoja", fields: [usuario_id], references: [id])
     
  nome        String  @db.VarChar(255)
  descricao   String  @db.Text 
  logo_url    String? @db.VarChar(255)
  banner_url  String? @db.VarChar(255)
  sticker_url String? @db.VarChar(255)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt 

  avaliacoes  avaliacoes_loja[] @relation("avaliacoesDaLoja")
  produtos    produtos[]        @relation("produtosDaLoja")*/
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
  @MaxLength(255)
  logo_url!: string;

  @IsString()
  @MaxLength(255)
  sticker_url!: string;

  @IsString()
  @MaxLength(255)
  banner_url!: string;
}
