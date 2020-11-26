import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AutomaticBill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
  })
  type: string;

  @Column('double')
  price: number;

  @Column({
    type: Date,
  })
  date: string;

  @Column({
    default: true,
  })
  active: boolean;
}
