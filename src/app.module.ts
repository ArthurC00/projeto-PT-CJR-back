import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ProdutoModule } from './produto/produto.module';
import { AvaliacoesProdutoModule } from './avaliacoes_produto/avaliacoes_produto.module';
import { AvaliacoesLojaModule } from './avaliacoes_loja/avaliacoes_loja.module';
import { CategoriasModule } from './categorias/categorias.module';
import { LojasModule } from './lojas/lojas.module';

@Module({
  imports: [
    UsuariosModule,
    AuthModule,
    ProdutoModule,
    AvaliacoesProdutoModule,
    AvaliacoesLojaModule,
    CategoriasModule,
    LojasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
