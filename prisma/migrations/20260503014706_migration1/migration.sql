-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha_hash" VARCHAR(255) NOT NULL,
    "foto_perfil_url" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lojas" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" TEXT NOT NULL,
    "logo_url" VARCHAR(255) NOT NULL,
    "banner_url" VARCHAR(255) NOT NULL,
    "sticker_url" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lojas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaliacoes_loja" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "loja_id" INTEGER NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,
    "avaliacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avaliacoes_loja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "loja_id" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,
    "estoque" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaliacoes_produto" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,
    "conteudo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avaliacoes_produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "categodria_pai_id" INTEGER NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagens_produto" (
    "id" SERIAL NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "url_imagem" VARCHAR(255) NOT NULL,
    "ordem" INTEGER NOT NULL,

    CONSTRAINT "imagens_produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comentarios_avaliacao" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "avaliacao_loja_id" INTEGER NOT NULL,
    "avaliacao_produto_id" INTEGER NOT NULL,
    "conteudo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comentarios_avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lojas_usuario_id_key" ON "lojas"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "avaliacoes_loja_usuario_id_key" ON "avaliacoes_loja"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "avaliacoes_loja_loja_id_key" ON "avaliacoes_loja"("loja_id");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_loja_id_key" ON "produtos"("loja_id");

-- CreateIndex
CREATE UNIQUE INDEX "avaliacoes_produto_usuario_id_key" ON "avaliacoes_produto"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "avaliacoes_produto_produto_id_key" ON "avaliacoes_produto"("produto_id");

-- CreateIndex
CREATE UNIQUE INDEX "imagens_produto_produto_id_key" ON "imagens_produto"("produto_id");

-- CreateIndex
CREATE UNIQUE INDEX "comentarios_avaliacao_usuario_id_key" ON "comentarios_avaliacao"("usuario_id");

-- AddForeignKey
ALTER TABLE "lojas" ADD CONSTRAINT "lojas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes_loja" ADD CONSTRAINT "avaliacoes_loja_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes_loja" ADD CONSTRAINT "avaliacoes_loja_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "lojas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "lojas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes_produto" ADD CONSTRAINT "avaliacoes_produto_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes_produto" ADD CONSTRAINT "avaliacoes_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_categodria_pai_id_fkey" FOREIGN KEY ("categodria_pai_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagens_produto" ADD CONSTRAINT "imagens_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios_avaliacao" ADD CONSTRAINT "comentarios_avaliacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios_avaliacao" ADD CONSTRAINT "comentarios_avaliacao_avaliacao_loja_id_fkey" FOREIGN KEY ("avaliacao_loja_id") REFERENCES "avaliacoes_loja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentarios_avaliacao" ADD CONSTRAINT "comentarios_avaliacao_avaliacao_produto_id_fkey" FOREIGN KEY ("avaliacao_produto_id") REFERENCES "avaliacoes_produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
