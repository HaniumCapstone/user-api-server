import { Controller, Get, Post, Body, Patch, Param, Headers, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { KakaoUserProfileDto } from './dto/kakao-user-profile.dto';

@ApiResponse({status:200, description:'성공'})
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiCreatedResponse({type:KakaoUserProfileDto, description:'성공'})
  @Post('/join')
  join(@Body('kAccessToken') kAccessToken: string) {
    if (!kAccessToken) throw new BadRequestException();
    try{
      return this.userService.join(kAccessToken)
    } catch(e){

    }
  }

  @Post('/login')
  login(@Headers('Header') jwt:string , @Body() createUserDto: CreateUserDto) {
    if (jwt) {
      // 1. get user id from jwt 
      // 2. return user profile
    }

    return this.userService.login(createUserDto.kAccessToken);
  }

  @Post('/logout')
  logout(@Headers('Header') jwt:string) {
    return this.userService.logout();
  }

  @ApiOperation({description:"for dev only"})
  @Get('/all')
  users() {
    return this.userService.users();
  }

  @Get('/profile')
  async myProfile(@Headers('Header') jwt:string,) {
    // 헤더 토큰을 파싱해 UID를 얻어 사용
  }


  @Get('/profile/:uid')
  async profile(@Param('uid') uid: string) {
    try{
      return await this.userService.profile(+uid);
    } catch(err){
      throw new NotFoundException();
    }
  }

  @Post('/mbti/:uid')
  createMBTI(@Headers('Header') jwt:string, @Param('uid') uid: number) {
    return this.userService.createMBTI(uid);
  }

  @Patch('/mbti/:uid')
  updateMBTI(@Headers('Header') jwt:string ,@Param('uid') uid: number) {
    return this.userService.updateMBTI(uid);
  }

}
