import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt';
import { KakaoauthService } from './kakaoauth/kakaoauth.service';
import { HttpModule } from '@nestjs/axios';
import { MbtiService } from './mbti/mbti.service';
import { CharacterService } from './character/character.service';
import { CharacterModule } from './character/character.module';
import { User } from './user/entities/user.entity';
import { Character } from './character/entities/character.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`config/env/.env.local`,],
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DATABASE_SYNCHRONIZE != 'false',
    }),
    TypeOrmModule.forFeature([User, Character]),
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
    CharacterModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, KakaoauthService, MbtiService, CharacterService],
})
export class AppModule { }
