import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger();
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'login',
    });
  }

  async validate(login: string, password: string) {
    const user = await this.authService.validateUser({ login, password });
    if (!user) {
      this.logger.log('Usuario nao encontrado');
      throw new UnauthorizedException();
    }
    this.logger.log(`Finalizando validacao usuario - ${user.login}`);
    return user;
  }
}
