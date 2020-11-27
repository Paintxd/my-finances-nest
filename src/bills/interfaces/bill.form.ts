import { PaymentMethod } from '../bill';

export interface BillForm {
  place: string;
  type: string;
  price: number;
  paymentMethod: PaymentMethod;
  date: string;
  installments?: number;
}
