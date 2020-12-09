import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomaticBillingModule } from './automatic-billing/automaticBilling.module';
import { BillModule } from './bills/bills.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
      logger: 'simple-console',
      logging: false,
    }),
    BillModule,
    AutomaticBillingModule,
    UsersModule,
    AuthModule,
    TenantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
