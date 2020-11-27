import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutomaticBill } from './automaticBill';
import { AutomaticBillingForm } from './interfaces/automaticBilling.form';
import { PaymentMethod } from '../bills/bill';
import { BillForm } from '../bills/interfaces/bill.form';
import { Utils } from '../utils/utils';
import { BillsService } from '../bills/bills.service';

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
        const dateSplited = new Date(Date.now())
          .toLocaleDateString('pt-BR')
          .split('-');
        dateSplited[2] = automaticBill.payDay.toString();
        const date = dateSplited.join('/');

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

    return await Promise.all(saveBills);
  }
}
