import { IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';
import { PaymentMethod } from '../bill';
export class BillForm {
  @IsNotEmpty()
  place: string;

  @IsNotEmpty()
  type: string;

  @Min(1)
  price: number;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsNotEmpty()
  date: string;

  @Min(1)
  @IsInt()
  installments: number;
}
