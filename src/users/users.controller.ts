import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserForm } from './user.form';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Post('/register')
  async registerUser(@Body() userForm: UserForm) {
    return this.usersService.registerUser(userForm);
  }
}
