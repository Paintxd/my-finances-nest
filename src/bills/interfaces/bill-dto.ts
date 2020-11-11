import { PaymentMethod } from 'src/bills/bill';

export interface BillDto {
  place: string;
  type: string;
  price: number;
  paymentMethod: PaymentMethod;
  date: string;
}
