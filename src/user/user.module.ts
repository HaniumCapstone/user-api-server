import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { KakaoauthService } from 'src/kakaoauth/kakaoauth.service';
import { MbtiService } from 'src/mbti/mbti.service';
import { CharacterService } from 'src/character/character.service';
import { Character } from 'src/character/entities/character.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: "test",
    }),
    TypeOrmModule.forFeature([User, Character]),
    HttpModule.register({ timeout: 5000, maxRedirects: 5 })],
  controllers: [UserController],
  providers: [UserService, KakaoauthService, MbtiService, CharacterService]
})
export class UserModule { }
