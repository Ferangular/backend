import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('OpenApi')
    .setDescription('Descripcion nuevo backend NestJS')
    .setVersion('0.1')
    .addTag('auth')
    .addBearerAuth() // Añadir el esquema de seguridad JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Guardar el archivo JSON de Swagger en la carpeta dist para su uso
  writeFileSync('./dist/swagger.json', JSON.stringify(document));

  await app.listen(3000);
}
bootstrap();
