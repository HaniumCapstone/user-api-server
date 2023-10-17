import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { KakaoauthService } from 'src/kakaoauth/kakaoauth.service';
import { MbtiService } from 'src/mbti/mbti.service';
import { CharacterService } from 'src/character/character.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mbtiService: MbtiService,
    private readonly characterService: CharacterService,
    private readonly kakaoauthService: KakaoauthService
  ) { }

  async createToken(claimPlain): Promise<{ accessToken: string }> {
    return {
      accessToken: await this.jwtService.signAsync(JSON.stringify(claimPlain)),
    };
  }

  async join(kAccessToken: string) {
    const kakaoProfile = await this.kakaoauthService.getProile(kAccessToken);
    const userProfile = await this.repository.findOne({
      where: { uid: kakaoProfile.id },
      select: { user_mbti: true, user_name: true, uid: true }
    })

    if (userProfile) return await this.createToken(userProfile);

    await this.repository.createQueryBuilder().insert().into(User).values([
      { uid: kakaoProfile.id, user_name: kakaoProfile.properties.nickname }
    ]).execute();

    return await this.createToken(await this.profile(kakaoProfile.id))
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException();
    }
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
      select: {
        user_mbti: true, user_name: true, uid: true, character_id: true,
      }
    })
  }

  async createMBTI(token: string, mbti: string) {
    this.verifyToken(token)
    const uid = this.jwtService.decode(token)['uid']
    await this.repository.update({ uid }, { user_mbti: mbti })
    return await this.createToken(await this.profile(uid))
  }

  async getMatch(mbti: string) {
    return this.mbtiService.getMatch(mbti)
  }

  async createTarget(token: string, character_id: number) {
    this.verifyToken(token)
    const uid = this.jwtService.decode(token)['uid']
    await this.repository.update({ uid }, { character_id })


    return this.characterService.characterById(character_id)
  }

  async getCharacterById(character_id: number) {
    return this.characterService.characterById(character_id)

  }

}
