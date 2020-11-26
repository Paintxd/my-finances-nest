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

  async inactiveBill(id: number) {
    return await this.automaticBillingRepository
      .createQueryBuilder()
      .update(AutomaticBill)
      .set({ active: false })
      .where('id = :id', { id })
      .execute();
  }

  async saveBill(automaticBillingDto: AutomaticBillingForm) {
    return await this.automaticBillingRepository.save(automaticBillingDto);
  }
}
