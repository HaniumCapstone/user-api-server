import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { KakaoUserProfileDto } from './dto/kakao-user-profile.dto';

@ApiResponse({status:200, description:'성공'})
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiCreatedResponse({type:KakaoUserProfileDto, description:'성공'})
  @Post('/join')
  join(@Body() createUserDto: CreateUserDto) {
    return this.userService.join(createUserDto.kAccessToken);
  }

  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto.kAccessToken);
  }

  @Post('/logout')
  logout() {
    return this.userService.logout();
  }

  // http://localhost/user/all
  @Get('/all')
  users() {
    return this.userService.users();
  }

  // http://localhost/user/:uid/profile
  @Get('/profile/:uid')
  profile(@Param('uid') uid: number) {
    return this.userService.profile(uid);
  }

  @Post('/mbti/:uid')
  createMBTI(@Param('uid') uid: number) {
    return this.userService.createMBTI(uid);
  }

  @Patch('/mbti/:uid')
  updateMBTI(@Param('uid') uid: number) {
    return this.userService.updateMBTI(uid);
  }

}
