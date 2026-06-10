import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  const config = new DocumentBuilder()
    .setTitle('Minha API NestJS')
    .setDescription('Rotas integradas automaticamente com o Insomnia')
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
