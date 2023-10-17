import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('character_info')
export class Character {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn()
  character_id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 10 })
  mbti: string;

  @Column()
  birth_date: Date;

  @Column()
  death_date: Date;

  @Column({ length: 50 })
  era: string;



  @Column({ type: 'text' })
  description: string;

}
