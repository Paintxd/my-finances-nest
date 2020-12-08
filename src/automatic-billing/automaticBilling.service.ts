import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AutomaticBill } from './automaticBill';
import { AutomaticBillingForm } from './automaticBilling.form';
import { PaymentMethod } from '../bills/bill';
import { BillForm } from '../bills/bill.form';
import { Utils } from '../utils/utils';
import { BillsService } from '../bills/bills.service';
import { set } from 'date-fns';
import { TenantService } from 'src/tenant/tenant-service.decorator';
import { TENANT_CONNECTION } from 'src/tenant/tenant.module';

@TenantService()
export class AutomaticBillingService {
  constructor(
    @Inject(TENANT_CONNECTION) private connection: Connection,
    private readonly billsService: BillsService,
  ) {}

  async findAll() {
    const repository = this.connection.getRepository(AutomaticBill);
    return await repository.find();
  }

  async findActives() {
    const repository = this.connection.getRepository(AutomaticBill);
    return await repository.find({ active: true });
  }

  async inactiveBill(id: number) {
    const repository = this.connection.getRepository(AutomaticBill);
    await repository
      .createQueryBuilder()
      .update(AutomaticBill)
      .set({ active: false })
      .where('id = :id', { id })
      .execute();

    return await repository.findOne(id);
  }

  async saveBill(automaticBillingDto: AutomaticBillingForm) {
    const repository = this.connection.getRepository(AutomaticBill);
    return await repository.save(automaticBillingDto);
  }

  async registerMonthBills() {
    const activeBilling = await this.findActives();
    const bills: BillForm[] = activeBilling.map(
      (automaticBill: AutomaticBill) => {
        const date = set(Date.now(), { date: automaticBill.payDay });
        const paymentMethod: PaymentMethod = PaymentMethod.BOLETO;

        const form = {
          place: '',
          type: automaticBill.type,
          price: automaticBill.price,
          paymentMethod,
          date,
        };
        return Utils.billDateFormat(form);
      },
    );

    const saveBills = bills.map((bill: BillForm) =>
      this.billsService.saveBill(bill),
    );

    const result = await Promise.all(saveBills);

    return result;
  }
}
