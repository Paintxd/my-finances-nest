import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interfaces/payload';
import { LoginForm } from './login.form';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginForm: LoginForm) {
    const user: User = await this.usersService.getUserByLogin(loginForm.login);
    const passwordCompare = await this.usersService.comparePassword(
      user.password,
      loginForm.password,
    );

    if (user && passwordCompare) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { name: user.name, sub: user.id };
    return {
      ...user,
      acess_token: this.jwtService.sign(payload),
    };
  }
}
