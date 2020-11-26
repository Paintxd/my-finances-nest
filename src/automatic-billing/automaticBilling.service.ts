import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutomaticBill } from './automaticBill';
import { AutomaticBillingForm } from './interfaces/automaticBilling.form';

export class AutomaticBillingService {
  constructor(
    @InjectRepository(AutomaticBill)
    private readonly automaticBillingRepository: Repository<AutomaticBill>,
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

  // implementar
  async registerMonthBills() {
    const activeBilling = await this.findActives();
    return activeBilling;
  }
}
