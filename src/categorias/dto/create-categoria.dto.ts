// "o que precisa ter pra criar uma categoria?" - primeira coisa que se faz no CRUD
// colocar o que tem no schema prisma, 

import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator"

export class CreateCategoriaDto {

    /*
    model categorias { 
  id                  Int    @id @default(autoincrement())
  nome                String @db.VarChar(100)

  categoria_pai_id    Int?
  categoria_pai       categorias?   @relation("categoria", fields: [categoria_pai_id], references: [id])

  tipos               categorias[] @relation("categoria")
  produto             produtos[]
}
    */

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nome!: string

  @IsOptional()
  @IsNumber()
  categoria_pai_id?: number

}
