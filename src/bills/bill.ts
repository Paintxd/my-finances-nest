import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PaymentMethod {
  CARTAO = 'cartao',
  BOLETO = 'boleto',
  DINHEIRO = 'dinheiro',
}

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  place: string;

  @Column({
    length: 20,
  })
  type: string;

  @Column('double')
  price: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.DINHEIRO,
  })
  paymentMethod: PaymentMethod;

  @Column()
  date: Date;
}
