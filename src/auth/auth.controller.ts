import { Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  private logger = new Logger();
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() request) {
    this.logger.log(`Iniciando auth user - ${JSON.stringify(request.user)}`);
    return this.authService.login(request.user);
  }
}
