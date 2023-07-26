import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_info')
export class User {
  @PrimaryGeneratedColumn()
  uid: string;

  @Column({ length: 255 })
  user_name: string;

  @Column({ length: 10 })
  user_mbti: string;
}
