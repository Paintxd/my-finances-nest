import { Inject, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { set } from 'date-fns';
import { AutomaticBill } from './automaticBill';
import { AutomaticBillingForm } from './automaticBilling.form';
import { PaymentMethod } from '../bills/bill';
import { BillForm } from '../bills/bill.form';
import { Utils } from '../utils/utils';
import { BillsService } from '../bills/bills.service';
import { TenantService } from '../tenant/tenant-service.decorator';
import { TENANT_CONNECTION } from '../tenant/tenant.module';

@TenantService()
export class AutomaticBillingService {
  private logger = new Logger();
  constructor(
    @Inject(TENANT_CONNECTION) private connection: Connection,
    private readonly billsService: BillsService,
  ) {}

  async findAll() {
    const repository = this.connection.getRepository(AutomaticBill);
    const result = await repository.find();

    this.logger.log(
      `Automatic-billings encontradas - ${JSON.stringify(result)}`,
    );
    return result;
  }

  async findActives() {
    const repository = this.connection.getRepository(AutomaticBill);
    const result = await repository.find({ active: true });

    this.logger.log(
      `Automatic-billings ativas encontradas - ${JSON.stringify(result)}`,
    );
    return result;
  }

  async inactiveBill(id: number) {
    const repository = this.connection.getRepository(AutomaticBill);
    await repository
      .createQueryBuilder()
      .update(AutomaticBill)
      .set({ active: false })
      .where('id = :id', { id })
      .execute();
    const result = await repository.findOne(id);

    this.logger.log(`Automatic-billing desativada - ${JSON.stringify(result)}`);
    return result;
  }

  async saveBill(automaticBillingDto: AutomaticBillingForm) {
    const repository = this.connection.getRepository(AutomaticBill);
    const result = await repository.save(automaticBillingDto);

    this.logger.log(`Automatic-billing salva - ${JSON.stringify(result)}`);
    return result;
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
