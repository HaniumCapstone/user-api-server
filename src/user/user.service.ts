import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>
  ) { }

  join(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  login() {
    return 'login service'
  }

  logout() {
    return 'logout service'
  }

  users() {
    return this.repository.createQueryBuilder('user').getMany();
  }

  profile(uid: number) {
    return uid
  }

  createMBTI(uid: number) {
    return uid
  }

  updateMBTI(uid: number) {
    return uid
  }

}
