import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { KakaoUserProfileDto } from './dto/kakao-user-profile.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService
  ) { }
  private readonly logger = new Logger(UserService.name)

  private readonly kakaoAPIProfile = 'https://kapi.kakao.com/v2/user/me';

  private async getKakaoProile(kAccessToken: string): Promise<KakaoUserProfileDto | null> {
    const { data } = await firstValueFrom(this.httpService.post(this.kakaoAPIProfile, {}, {
      headers: {
        "Authorization": "Bearer " + kAccessToken,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    }).pipe(catchError((error: AxiosError) => {
      this.logger.error(error.response.data);
      throw new UnauthorizedException()
    })))

    return data;
  }

  createToken(claimPlain): { accessToken: string } {
    const accessToken = this.jwtService.sign(claimPlain);
    return { accessToken }
  }

  async join(kAccessToken: string) {
    const kakaoProfile = await this.getKakaoProile(kAccessToken);
    const userProfile = await this.repository.findOne({
      where: { uid: kakaoProfile.id },
      select: { user_mbti: true, user_name: true, created_at: true }
    })

    if (userProfile) return userProfile;

    await this.repository.createQueryBuilder().insert().into(User).values([
      { uid: kakaoProfile.id, user_name: kakaoProfile.properties.nickname }
    ]).execute();

    // 현재는 프로필 정보만 반환하지만 차후에는 jwt 토큰과 함께 반환
    return this.createToken(await this.profile(kakaoProfile.id))
  }

  async login(kAccessToken: string) {
    return await this.getKakaoProile(kAccessToken);
  }

  logout() {
    return 'logout service'
  }

  users() {
    return this.repository.createQueryBuilder('user_info').getMany();
  }

  async profile(uid: number) {
    return await this.repository.findOneOrFail({
      where: { uid: uid },
      select: { user_mbti: true, user_name: true, created_at: true }
    })
  }

  createMBTI(uid: number) {
    return uid
  }

  updateMBTI(uid: number) {
    return uid
  }

}
