import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 7675eb95d938174dc7e35f843f9974a58cf62372

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
  });

  const config = new DocumentBuilder()
    .setTitle('API Router')
    .setDescription('Todas as rotas do projeto')
    .setVersion('1.0')
    .addServer('http://localhost:3001')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: '/api/json',
  });

<<<<<<< HEAD
=======
>>>>>>> 188d21de862784032c46454aff52b3b85bfdf177
>>>>>>> 7675eb95d938174dc7e35f843f9974a58cf62372
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
