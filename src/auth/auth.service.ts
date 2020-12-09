import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interfaces/payload';
import { LoginForm } from './login.form';

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginForm: LoginForm) {
    this.logger.log(
      `Iniciando validacao do usuario - ${JSON.stringify(loginForm)}`,
    );
    const user: User = await this.usersService.getUserByLogin(loginForm.login);
    this.logger.log('Comparando hash com password');
    const passwordCompare = await this.usersService.comparePassword(
      user.password,
      loginForm.password,
    );

    if (user && passwordCompare) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    this.logger.log('Falha na autenticacao');
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      login: user.login,
      name: user.name,
      id: user.id,
    };
    this.logger.log(`Finalizando login retornando token`);
    return {
      ...user,
      acess_token: this.jwtService.sign(payload),
    };
  }

  decodeToken(headers) {
    this.logger.log('Realizando decodificacao do token nos headers');
    const token = headers.authorization.split(' ')[1] || '';
    return this.jwtService.decode(token);
  }
}
