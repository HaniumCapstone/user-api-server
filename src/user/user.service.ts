import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { KakaoUserProfileDto } from './dto/kakao-user-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private readonly httpService: HttpService
  ) { }
  private readonly logger = new Logger(UserService.name)

  private readonly kakaoAPIProfile = 'https://kapi.kakao.com/v2/user/me';

  private async getKakaoProile(kAccessToken: string): Promise<KakaoUserProfileDto | null> {
    if (!kAccessToken) return null

    const { data } = await firstValueFrom(this.httpService.post(this.kakaoAPIProfile, {}, {
      headers: {
        "Authorization": "Bearer " + kAccessToken,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    }).pipe(catchError((error: AxiosError) => {
      // 잘못된 액세트토큰을 줬을 때도 아래 코드가 실행되지 않습니다.
      // 차후 확인이 필요해보입니다. 
      this.logger.error(error.response.data);
      throw "can't get kakao user data."
    })))

    return data;
  }

  async join(kAccessToken: string) {
    const userData = await this.getKakaoProile(kAccessToken)

    // responce error 떨어뜨릴 것.
    if (!userData) return false

    return await this.getKakaoProile(kAccessToken) ?? false;
  }

  async login(kAccessToken: string) {
    return await this.getKakaoProile(kAccessToken) ?? false;
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
