import { PaymentMethod } from 'src/bills/bill';

export interface BillForm {
  place: string;
  type: string;
  price: number;
  paymentMethod: PaymentMethod;
  date: string;
  installments?: number;
}
