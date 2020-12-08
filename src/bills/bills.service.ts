import { BillForm } from './bill.form';
import { Bill } from './bill';
import { Utils } from '../utils/utils';
import { Connection } from 'typeorm';
import { TenantService } from '../tenant/tenant-service.decorator';
import { Inject } from '@nestjs/common';
import { TENANT_CONNECTION } from 'src/tenant/tenant.module';

@TenantService()
export class BillsService {
  constructor(@Inject(TENANT_CONNECTION) private connection: Connection) {}

  async findAll(): Promise<Bill[]> {
    const repository = this.connection.getRepository(Bill);
    const bills = await repository.find();

    return bills.map((bill) => Utils.billDateFormat(bill));
  }

  async findAllByAtributeFilter(
    atribute: string,
    filter: string,
  ): Promise<Bill[]> {
    const repository = this.connection.getRepository(Bill);
    const bills = await repository.find(Utils.findParam(atribute, filter));

    return bills.map((bill) => Utils.billDateFormat(bill));
  }

  async saveBill(bill: BillForm): Promise<Bill | Bill[]> {
    const repository = this.connection.getRepository(Bill);
    if (!bill.installments)
      return Utils.billDateFormat(
        await repository.save(Utils.billDateFormat(bill)),
      );

    let months = bill.installments;
    const bills: Promise<Bill>[] = [];
    while (months > 0) {
      const date = Utils.installmentsDateReturn(bill.date, months);

      bills.push(repository.save({ ...bill, date }));
      months--;
    }

    const result = await Promise.all(bills);
    return result.map((bill) => Utils.billDateFormat(bill));
  }

  async deleteBill(id: number) {
    const repository = this.connection.getRepository(Bill);
    return await repository.delete(id);
  }
}
