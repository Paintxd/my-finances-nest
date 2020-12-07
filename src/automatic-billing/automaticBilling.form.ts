import { IsNotEmpty, Min } from 'class-validator';

export class AutomaticBillingForm {
  @IsNotEmpty({
    message: 'Obrigatorio informar tipo da compra',
  })
  type: string;

  @Min(1, {
    message: 'Obrigatorio informar um preco valido',
  })
  price: number;

  @Min(1, {
    message: 'Obrigatorio informar um dia de vencimento valido',
  })
  payDay: number;
}
