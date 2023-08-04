import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  HttpModule.register({ timeout: 5000, maxRedirects: 5 })],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
