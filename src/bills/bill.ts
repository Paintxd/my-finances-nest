import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PaymentMethod {
  CARTAO = 'cartao',
  BOLETO = 'boleto',
  DINHEIRO = 'dinheiro',
  AUTOMATIC_BILLING = 'automatic_billing',
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
  })
  paymentMethod: PaymentMethod;

  @Column({
    default: 1,
  })
  installments: number;

  @Column({
    type: Date,
  })
  date: string;
}
