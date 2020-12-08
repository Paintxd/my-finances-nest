import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AutomaticBill } from 'src/automatic-billing/automaticBill';
import { Bill } from 'src/bills/bill';
import { Connection, createConnection, getConnection } from 'typeorm';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly connection: Connection,
  ) {}

  async use(req: Request, res: Response, next) {
    if (!req.headers['authorization']) throw new UnauthorizedException();
    const tenant = this.authService.decodeToken(req.headers);

    if (!tenant) throw new BadRequestException();

    try {
      getConnection(tenant['login']);
      next();
    } catch (e) {
      this.connection.query(`CREATE DATABASE IF NOT EXISTS ${tenant['login']}`);

      const createdConnection: Connection = await createConnection({
        name: tenant['login'],
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: tenant['login'],
        synchronize: true,
        entities: [Bill, AutomaticBill],
      });

      if (!createdConnection) throw new BadRequestException();

      next();
    }
  }
}
