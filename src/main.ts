import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
  .setTitle('User api server')
  .setDescription('문화재 탐방 서비스의 유저 api 서버 입니다.')
  .setVersion('1.0.0')
  .build();

  const ducument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, ducument)

  await app.listen(process.env.APP_PORT||3000);
}
bootstrap();
