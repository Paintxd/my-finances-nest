import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomaticBillingModule } from './automatic-billing/automaticBilling.module';
import { BillModule } from './bills/bills.module';

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
      logging: true,
    }),
    BillModule,
    AutomaticBillingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
