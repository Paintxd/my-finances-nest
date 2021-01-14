import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';
import { UserForm } from './user.form';
import bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  private logger = new Logger();
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<User> {
    const result = await this.usersRepository.findOne(id);

    this.logger.log(`Usuario id ${id} encontrado - ${JSON.stringify(result)}`);

    return result;
  }

  async getUserByLogin(login: string): Promise<User> {
    const result = await this.usersRepository.findOne({ login });
    if (!result) {
      this.logger.error(`Usuario login ${login} nao encontrado`);
      throw new NotFoundException();
    }

    this.logger.log(
      `Usuario login ${login} encontrado - ${JSON.stringify(result)}`,
    );

    return result;
  }

  async comparePassword(hash: string, password: string) {
    return await bcrypt.compare(password, hash);
  }

  async registerUser(userForm: UserForm): Promise<User> {
    const password = await this.hashPassword(userForm.password);
    const result = await this.usersRepository.save({ ...userForm, password });

    this.logger.log(`Usuario registado - ${JSON.stringify(result)}`);

    return result;
  }

  private async hashPassword(password: string): Promise<string> {
    this.logger.log('Hashing password');
    const salt = await bcrypt.genSalt();

    return await bcrypt.hash(password, salt);
  }
}
