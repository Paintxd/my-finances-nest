import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomaticBill } from './automaticBill';
import { AutomaticBillingController } from './automaticBilling.controller';
import { AutomaticBillingService } from './automaticBilling.service';

@Module({
  imports: [TypeOrmModule.forFeature([AutomaticBill])],
  controllers: [AutomaticBillingController],
  providers: [AutomaticBillingService],
})
export class AutomaticBillingModule {}
