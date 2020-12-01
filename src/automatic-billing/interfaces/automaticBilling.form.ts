import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class AutomaticBillingForm {
  @IsNotEmpty()
  type: string;

  @Min(1)
  price: number;

  @IsInt()
  @Min(1)
  payDay: number;
}
