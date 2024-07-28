import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  let port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true}));
  
  const config = new DocumentBuilder()
    .setTitle('Hospyta Community API')
    .setDescription('API documentation for the Hospyta community feature')
    .setVersion('1.0')
    .addServer(`http://localhost:3000/`, 'Local environment')
    .addServer(process.env.STAGING_URL , 'Staging environment')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); 

  await app.listen(port);
  console.log(`Hurray! app is running, check the docs at http://localhost:${port}/docs`)
}
bootstrap();
