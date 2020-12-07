import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    length: 20,
  })
  login: string;

  @Column({
    length: 100,
  })
  password: string;

  @Column({
    length: 50,
  })
  email: string;
}
