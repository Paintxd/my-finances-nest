import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AutomaticBill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    default: 'AUTOMATIC_BILLING',
  })
  type: string;

  @Column('double')
  price: number;

  @Column()
  payDay: number;

  @Column({
    default: true,
  })
  active: boolean;
}
