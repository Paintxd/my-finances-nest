import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserForm } from './user.form';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  private logger = new Logger();
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    this.logger.log(`Buscando usuario com id - ${id}`);
    return this.usersService.getUserById(id);
  }

  @Post('/register')
  async registerUser(@Body() userForm: UserForm) {
    this.logger.log(
      `Registrando usuario com body - ${JSON.stringify(userForm)}`,
    );
    return this.usersService.registerUser(userForm);
  }
}
