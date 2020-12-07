import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';
import { UserForm } from './user.form';
import bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async getUserByLogin(login: string): Promise<User> {
    return await this.usersRepository.findOne({ login });
  }

  async comparePassword(hash: string, password: string) {
    return await bcrypt.compare(password, hash);
  }

  async registerUser(userForm: UserForm): Promise<User> {
    const password = await this.hashPassword(userForm.password);

    return await this.usersRepository.save({ ...userForm, password });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(password, salt);
  }
}
