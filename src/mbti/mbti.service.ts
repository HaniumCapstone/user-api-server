import { Injectable } from '@nestjs/common';
import { CharacterService } from 'src/character/character.service';

@Injectable()
export class MbtiService {
  constructor(
    private readonly characterService: CharacterService,
  ) { }

  private readonly MBTI: { [k: string]: string[] } = {
    INFP: ['ENFJ', 'ENTJ'],
    ENFP: ['INFJ', 'INTJ'],
    INFJ: ['ENFP', 'ENTP'],
    ENFJ: ['INFP', 'ISFP'],
    INTJ: ['ENFP', 'ENTP'],
    ENTJ: ['INFP', 'INTP'],
    INTP: ['ENTJ', 'ESTJ'],
    ENTP: ['INFJ', 'INTJ'],
    ISFP: ['ENFJ', 'ESFJ', 'ESTJ'],
    ESFP: ['ISFJ', 'ISTJ'],
    ISTP: ['ESFJ', 'ESTJ'],
    ESTP: ['ISFJ', 'ISTJ'],
    ISFJ: ['ESFP', 'ESTP'],
    ESFJ: ['ISFP', 'ISTP'],
    ISTJ: ['ESFP', 'ESTP'],
    ESTJ: ['INTP', 'ISFP', 'ISTP']
  }

  getMatch(mbti: string) {
    const match = this.MBTI[mbti]
    if (!match) return this.characterService.characterByMBTIs([
      "ENFP",
      "ENFJ",
      "ENTP",
      "ENTJ",
      "ESFP",
      "ESFJ",
      "ESTP",
      "ESTJ",
      "INFP",
      "INFJ",
      "INTP",
      "INTJ",
      "ISFP",
      "ISFJ",
      "ISTP",
      "ISTJ",
    ])

    return this.characterService.characterByMBTIs(match)
  }

}
