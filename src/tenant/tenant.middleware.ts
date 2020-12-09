import {
  BadRequestException,
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AutomaticBill } from 'src/automatic-billing/automaticBill';
import { Bill } from 'src/bills/bill';
import { Connection, createConnection, getConnection } from 'typeorm';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private logger = new Logger();
  constructor(
    private readonly authService: AuthService,
    private readonly connection: Connection,
  ) {}

  async use(req: Request, res: Response, next) {
    if (!req.headers['authorization']) {
      this.logger.log('Request sem header authorization');
      throw new UnauthorizedException();
    }
    const tenant = this.authService.decodeToken(req.headers);

    if (!tenant) throw new BadRequestException();

    try {
      getConnection(tenant['login']);
      this.logger.log(`Tenant encontrando na bd ${tenant['login']}`);
      next();
    } catch (e) {
      this.connection.query(`CREATE DATABASE IF NOT EXISTS ${tenant['login']}`);
      this.logger.log(`bd criada tenant - ${tenant['login']}`);
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

      if (!createdConnection) {
        this.logger.log('Erro na criacao da bd');
        throw new BadRequestException();
      }
      next();
    }
  }
}
