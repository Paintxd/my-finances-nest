import { Min } from 'class-validator';

export class AutomaticBillingForm {
  @Min(1, {
    message: 'Obrigatorio informar um preco valido',
  })
  price: number;

  @Min(1, {
    message: 'Obrigatorio informar um dia de vencimento valido',
  })
  payDay: number;
}
