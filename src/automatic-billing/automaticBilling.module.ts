import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AutomaticBillingController } from './automaticBilling.controller';
import { AutomaticBillingService } from './automaticBilling.service';
import { BillModule } from '../bills/bills.module';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  imports: [ScheduleModule.forRoot(), BillModule, TenantModule],
  controllers: [AutomaticBillingController],
  providers: [AutomaticBillingService],
})
export class AutomaticBillingModule {}
