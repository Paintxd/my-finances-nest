import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillForm } from 'src/bills/interfaces/bill-form';
import { Bill } from 'src/bills/bill';
import { Utils } from 'src/utils/utils';
import { Repository } from 'typeorm';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billsRepository: Repository<Bill>,
  ) {}

  async findAll(): Promise<Bill[]> {
    const bills = await this.billsRepository.find();

    return bills.map((bill) => Utils.billFormater(bill));
  }

  async findAllByAtributeFilter(
    atribute: string,
    filter: string,
  ): Promise<Bill[]> {
    const bills = await this.billsRepository.find(
      Utils.findParam(atribute, filter),
    );

    return bills.map((bill) => Utils.billFormater(bill));
  }

  async saveBill(bill: BillForm): Promise<Bill | Bill[]> {
    if (!bill.installments || bill.installments === 1)
      return await this.billsRepository.save(bill);

    let months = bill.installments;
    const bills: Promise<Bill>[] = [];
    while (months > 0) {
      const dateSplited = bill.date.split('/'); // dd/MM/yyyy
      const month = parseInt(dateSplited[1]) + months;
      if (month > 12) {
        const yearIncrease = parseInt(dateSplited[2]) + Math.trunc(month / 12);
        dateSplited[2] = yearIncrease.toString();
      }
      dateSplited[1] = month % 12 === 0 ? '12' : (month % 12).toString();

      const date = dateSplited.reverse().join('/');
      bills.push(this.billsRepository.save({ ...bill, date }));
      months--;
    }
    return await Promise.all(bills);
  }
}
