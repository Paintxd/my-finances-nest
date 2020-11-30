import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillForm } from './interfaces/bill.form';
import { Bill } from './bill';
import { Utils } from '../utils/utils';
import { Repository } from 'typeorm';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billsRepository: Repository<Bill>,
  ) {}

  async findAll(): Promise<Bill[]> {
    const bills = await this.billsRepository.find();

    return bills.map((bill) => Utils.billDateFormat(bill));
  }

  async findAllByAtributeFilter(
    atribute: string,
    filter: string,
  ): Promise<Bill[]> {
    const bills = await this.billsRepository.find(
      Utils.findParam(atribute, filter),
    );

    return bills.map((bill) => Utils.billDateFormat(bill));
  }

  async saveBill(bill: BillForm): Promise<Bill | Bill[]> {
    if (!bill.installments)
      return Utils.billDateFormat(
        await this.billsRepository.save(Utils.billDateFormat(bill)),
      );

    let months = bill.installments;
    const bills: Promise<Bill>[] = [];
    while (months > 0) {
      const date = Utils.installmentsDateReturn(bill.date, months);

      bills.push(this.billsRepository.save({ ...bill, date }));
      months--;
    }

    const result = await Promise.all(bills);
    return result.map((bill) => Utils.billDateFormat(bill));
  }

  async deleteBill(id: number) {
    return await this.billsRepository.delete(id);
  }
}
