import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomaticBill } from './automaticBill';
import { AutomaticBillingController } from './automaticBilling.controller';
import { AutomaticBillingService } from './automaticBilling.service';
import { BillModule } from '../bills/bills.module';

@Module({
  imports: [TypeOrmModule.forFeature([AutomaticBill]), BillModule],
  controllers: [AutomaticBillingController],
  providers: [AutomaticBillingService],
})
export class AutomaticBillingModule {}
