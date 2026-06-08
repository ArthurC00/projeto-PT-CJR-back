import { isNotEmpty, IsNotEmpty, IsString, isString, MaxLength } from "class-validator";

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
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nome!: String;

  @IsString()
  descricao!: String;

  @IsString()
  @MaxLength(255)  
  logo_url!: String;

  @IsString()
  @MaxLength(255)  
  sticker_url!: String;


  @IsString()
  @MaxLength(255)  
  banner_url!: String;
}
