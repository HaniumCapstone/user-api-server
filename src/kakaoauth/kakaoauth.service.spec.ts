import { Test, TestingModule } from '@nestjs/testing';
import { KakaoauthService } from './kakaoauth.service';

describe('KakaoauthService', () => {
  let service: KakaoauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KakaoauthService],
    }).compile();

    service = module.get<KakaoauthService>(KakaoauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
