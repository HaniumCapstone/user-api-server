import { ApiProperty } from "@nestjs/swagger"


class KakaoUserAccountProfileDto {
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  thumbnail_image_url: string;
  @ApiProperty()
  profile_image_url: string;
  @ApiProperty()
  is_default_image: boolean;
}

class KakaoUserPorpertiesDto {
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  profile_image: string;
  @ApiProperty()
  thumbnail_image: string;
}

class KakaoUserAccountDto {
  @ApiProperty()
  profile_nickname_needs_agreement: boolean;
  @ApiProperty()
  profile_image_needs_agreement: boolean;
  @ApiProperty({ type: KakaoUserAccountProfileDto })
  profile: KakaoUserAccountProfileDto
}

export class KakaoUserProfileDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  connected_at: string;

  @ApiProperty({ type: KakaoUserPorpertiesDto })
  properties: KakaoUserPorpertiesDto;

  @ApiProperty({ type: KakaoUserAccountDto })
  kakao_account: KakaoUserAccountDto
}