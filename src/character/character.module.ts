import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterService } from './character.service';
import { Character } from './entities/character.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character]),
  ],
  providers: [CharacterService]
})
export class CharacterModule { }
