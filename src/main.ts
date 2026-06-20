import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';
import { runSeed } from '../prisma/seed';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors();

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
  });

  const config = new DocumentBuilder()
    .setTitle('API Router')
    .setDescription('Todas as rotas do projeto')
    .setVersion('1.0')
    .addServer(process.env.BACKEND_URL || 'http://localhost:3001')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: '/api/json',
  });

  const prisma = new PrismaClient();
  const count = await prisma.usuario.count();
  if (count === 0) {
    console.log('Banco vazio, populando dados...');
    await runSeed();
  }

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
