import { IsEnum, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { PaymentMethod } from '../bill';

export class BillForm {
  @IsNotEmpty({
    message: 'Obrigatorio informar local da compra',
  })
  place: string;

  @IsNotEmpty({
    message: 'Obrigatorio informar tipo da compra',
  })
  type: string;

  @Min(1, {
    message: 'Obrigatorio informar um preco valido',
  })
  price: number;

  @IsEnum(PaymentMethod, {
    message: 'Metodos de pagamento: [ Cartao, Boleto, Dinheiro ]',
  })
  paymentMethod: PaymentMethod;

  @IsNotEmpty({
    message: 'Obrigatorio informar uma data',
  })
  date: string;

  @Min(1, {
    message: 'Conta deve possuir no minimo uma parcela',
  })
  @IsOptional({
    always: true,
  })
  installments: number;
}
