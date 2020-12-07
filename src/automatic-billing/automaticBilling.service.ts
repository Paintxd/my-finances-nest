import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutomaticBill } from './automaticBill';
import { AutomaticBillingForm } from './automaticBilling.form';
import { PaymentMethod } from '../bills/bill';
import { BillForm } from '../bills/bill.form';
import { Utils } from '../utils/utils';
import { BillsService } from '../bills/bills.service';
import { set } from 'date-fns';

export class AutomaticBillingService {
  constructor(
    @InjectRepository(AutomaticBill)
    private readonly automaticBillingRepository: Repository<AutomaticBill>,
    private readonly billsService: BillsService,
  ) {}

  async findAll() {
    return await this.automaticBillingRepository.find();
  }

  async findActives() {
    return await this.automaticBillingRepository.find({ active: true });
  }

  async inactiveBill(id: number) {
    await this.automaticBillingRepository
      .createQueryBuilder()
      .update(AutomaticBill)
      .set({ active: false })
      .where('id = :id', { id })
      .execute();

    return await this.automaticBillingRepository.findOne(id);
  }

  async saveBill(automaticBillingDto: AutomaticBillingForm) {
    return await this.automaticBillingRepository.save(automaticBillingDto);
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
