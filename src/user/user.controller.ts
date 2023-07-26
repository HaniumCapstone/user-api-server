import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  join(@Body() createUserDto: CreateUserDto) {
    return this.userService.join(createUserDto);
  }

  @Post()
  login() {
    return this.userService.login();
  }

  @Post()
  logout() {
    return this.userService.logout();
  }

  // http://localhost/user/all
  @Get('/all')
  users() {
    return this.userService.users();
  }

  // http://localhost/user/:uid/profile
  @Get(':uid/profile')
  profile(@Param('uid') uid: number) {
    return this.userService.profile(uid);
  }

  @Post(':uid/mbti')
  createMBTI(@Param('uid') uid: number) {
    return this.userService.createMBTI(uid);
  }

  @Patch(':uid/mbti')
  updateMBTI(@Param('uid') uid: number) {
    return this.userService.updateMBTI(uid);
  }

}
