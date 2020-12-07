import { IsNotEmpty } from 'class-validator';

export class LoginForm {
  @IsNotEmpty({
    message: 'Obrgatorio informar um login',
  })
  login: string;

  @IsNotEmpty({
    message: 'Obrgatorio informar uma senha',
  })
  password: string;
}
