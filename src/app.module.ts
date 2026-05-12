import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [UsuariosModule, AuthModule, CategoriasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
