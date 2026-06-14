/*
  Warnings:

  - You are about to drop the column `avaliacao` on the `avaliacoes_loja` table. All the data in the column will be lost.
  - You are about to alter the column `nota` on the `avaliacoes_loja` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `conteudo` on the `avaliacoes_produto` table. All the data in the column will be lost.
  - You are about to alter the column `nota` on the `avaliacoes_produto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `categodria_pai_id` on the `categorias` table. All the data in the column will be lost.
  - You are about to alter the column `preco` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - Added the required column `nome` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comentario` to the `avaliacoes_loja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comentario` to the `avaliacoes_produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoria_id` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categorias" DROP CONSTRAINT "categorias_categodria_pai_id_fkey";

-- DropForeignKey
ALTER TABLE "comentarios_avaliacao" DROP CONSTRAINT "comentarios_avaliacao_avaliacao_loja_id_fkey";

-- DropForeignKey
ALTER TABLE "comentarios_avaliacao" DROP CONSTRAINT "comentarios_avaliacao_avaliacao_produto_id_fkey";

-- DropIndex
DROP INDEX "avaliacoes_loja_loja_id_key";

-- DropIndex
DROP INDEX "avaliacoes_loja_usuario_id_key";

-- DropIndex
DROP INDEX "avaliacoes_produto_produto_id_key";

-- DropIndex
DROP INDEX "avaliacoes_produto_usuario_id_key";

-- DropIndex
DROP INDEX "comentarios_avaliacao_usuario_id_key";

-- DropIndex
DROP INDEX "imagens_produto_produto_id_key";

-- DropIndex
DROP INDEX "lojas_usuario_id_key";

-- DropIndex
DROP INDEX "produtos_loja_id_key";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "nome" VARCHAR(255) NOT NULL,
ALTER COLUMN "foto_perfil_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "avaliacoes_loja" DROP COLUMN "avaliacao",
ADD COLUMN     "comentario" TEXT NOT NULL,
ALTER COLUMN "nota" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "avaliacoes_produto" DROP COLUMN "conteudo",
ADD COLUMN     "comentario" TEXT NOT NULL,
ALTER COLUMN "nota" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "categorias" DROP COLUMN "categodria_pai_id",
ADD COLUMN     "categoria_pai_id" INTEGER;

-- AlterTable
ALTER TABLE "comentarios_avaliacao" ALTER COLUMN "avaliacao_loja_id" DROP NOT NULL,
ALTER COLUMN "avaliacao_produto_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "lojas" ALTER COLUMN "logo_url" DROP NOT NULL,
ALTER COLUMN "banner_url" DROP NOT NULL,
ALTER COLUMN "sticker_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "categoria_id" INTEGER NOT NULL,
ALTER COLUMN "preco" SET DATA TYPE DECIMAL(10,2);

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_categoria_pai_id_fkey" FOREIGN KEY ("categoria_pai_id") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios_avaliacao" ADD CONSTRAINT "comentarios_avaliacao_avaliacao_loja_id_fkey" FOREIGN KEY ("avaliacao_loja_id") REFERENCES "avaliacoes_loja"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios_avaliacao" ADD CONSTRAINT "comentarios_avaliacao_avaliacao_produto_id_fkey" FOREIGN KEY ("avaliacao_produto_id") REFERENCES "avaliacoes_produto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
