import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { KakaoUserProfileDto } from './dto/kakao-user-profile.dto';

@Injectable()
export class KakaoauthService {
  constructor(
    private readonly httpService: HttpService

  ) { }
  private readonly logger = new Logger(KakaoauthService.name)


  private readonly kakaoAPIProfile = 'https://kapi.kakao.com/v2/user/me';

  async getProile(kAccessToken: string): Promise<KakaoUserProfileDto | null> {
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

}
