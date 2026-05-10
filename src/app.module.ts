import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { LojasModule } from './lojas/lojas.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [UsuariosModule, AuthModule, LojasModule ], 
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
