import { Inject, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BillForm } from './bill.form';
import { Bill } from './bill';
import { Utils } from '../utils/utils';
import { TenantService } from '../tenant/tenant-service.decorator';
import { TENANT_CONNECTION } from '../tenant/tenant.module';

@TenantService()
export class BillsService {
  private logger = new Logger();
  constructor(@Inject(TENANT_CONNECTION) private connection: Connection) {}

  async findAll(): Promise<Bill[]> {
    const repository = this.connection.getRepository(Bill);
    const bills = await repository.find();
    const formatedBills = bills.map((bill) => Utils.billDateFormat(bill));

    this.logger.log(`Bills encontradas - ${JSON.stringify(formatedBills)}`);
    return formatedBills;
  }

  async findAllByAtributeFilter(
    atribute: string,
    filter: string,
  ): Promise<Bill[]> {
    const repository = this.connection.getRepository(Bill);
    const bills = await repository.find(Utils.findParam(atribute, filter));
    const formatedBills = bills.map((bill) => Utils.billDateFormat(bill));

    this.logger.log(
      `Bills filtradas encontradas - ${JSON.stringify(formatedBills)}`,
    );
    return formatedBills;
  }

  async saveBill(bill: BillForm): Promise<Bill | Bill[]> {
    const repository = this.connection.getRepository(Bill);
    if (!bill.installments) {
      const savedBill = Utils.billDateFormat(
        await repository.save(Utils.billDateFormat(bill)),
      );

      this.logger.log(`Bill salva - ${JSON.stringify(savedBill)}`);
      return savedBill;
    }

    let months = bill.installments;
    const bills: Promise<Bill>[] = [];
    while (months > 0) {
      const date = Utils.installmentsDateReturn(bill.date, months);

      bills.push(repository.save({ ...bill, date }));
      months--;
    }

    const result = await Promise.all(bills);
    const formatedBills = result.map((bill) => Utils.billDateFormat(bill));

    this.logger.log(`Bills salvas - ${JSON.stringify(formatedBills)}`);
    return formatedBills;
  }

  async deleteBill(id: number) {
    const repository = this.connection.getRepository(Bill);
    this.logger.log(`Bill id - ${id} excluida`);
    return await repository.delete(id);
  }
}
