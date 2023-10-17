import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('user_info')
export class User {
  // @PrimaryGeneratedColumn()
  @PrimaryColumn({ type: "bigint" })
  uid: number;

  @Column({ length: 255 })
  user_name: string;

  @Column({ length: 10 })
  user_mbti: string;

  @Column({ type: "bigint" })
  birth_date: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  character_id: number;
}
