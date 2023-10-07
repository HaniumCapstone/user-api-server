import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character) private repository: Repository<Character>,
  ) { }

  async characterByMBTI(mbti_: string) {
    const res = await this.repository.findOneOrFail({
      where: { mbti: mbti_ },
    })

    return res;
  }


  async characterById(id: number) {
    const res = await this.repository.findOneOrFail({
      where: { character_id: id },
    })

    return res;
  }


  async characterByMBTIs(mbtis_: string[]) {
    const res = await this.repository.createQueryBuilder('character_info')
      .where('character_info.mbti IN (:...mbtis)', { mbtis: mbtis_ })
      .getMany();

    return res;
  }
}
