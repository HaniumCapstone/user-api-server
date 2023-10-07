import { Controller, Get, Post, Body, Patch, Param, Headers, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { KakaoUserProfileDto } from './dto/kakao-user-profile.dto';

@ApiResponse({ status: 200, description: '성공' })
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiCreatedResponse({ type: KakaoUserProfileDto, description: '성공' })
  @Post('/join')
  join(@Body('kAccessToken') kAccessToken: string) {
    if (!kAccessToken) throw new BadRequestException();
    try {
      return this.userService.join(kAccessToken)
    } catch (e) {
      console.log(e)
    }
  }

  @Post('/verify-token')
  login(@Headers('Authorization') auth: string, @Body() createUserDto: CreateUserDto) {
    try {
      const token = auth.replace('Bearer ', '');
      return this.userService.verifyToken(token);
    } catch (err) {
      throw new BadRequestException();
    }

  }

  @Post('/logout')
  logout(@Headers('Header') jwt: string) {
    return this.userService.logout();
  }


  @ApiOperation({ description: "for dev only" })
  @Get('/all')
  users() {
    return this.userService.users();
  }

  @Get('/profile')
  async myProfile(@Headers('Header') jwt: string,) {
    // 헤더 토큰을 파싱해 UID를 얻어 사용
  }

  @Get('/get-match')
  async getMatch(@Param('mbti') mbti: string) {
    return this.userService.getMatch(mbti)
  }

  @Post('/update-target')
  async updateTarget(@Headers('Authorization') auth: string, @Body('character') character: number) {
    const token = auth.replace('Bearer ', '');
    console.log(token)
    return this.userService.createTarget(token, +character)
  }

  @Get('/profile/:uid')
  async profile(@Param('uid') uid: string) {
    try {
      return await this.userService.profile(+uid);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Get('/character/:character_id')
  async getCharacterById(@Param('character_id') id) {
    try {
      return await this.userService.getCharacterById(+id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Post('/mbti')
  createMBTI(@Headers('Authorization') auth: string, @Body('mbti') mbti: string) {
    if (!auth) { throw new UnauthorizedException() };

    return this.userService.createMBTI(auth.replace('Bearer ', ''), mbti);
  }

}
