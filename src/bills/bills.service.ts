import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillDto } from 'src/bills/interfaces/bill-dto';
import { Bill } from 'src/bills/bill';
import { Utils } from 'src/utils/utils';
import { Repository } from 'typeorm';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billsRepository: Repository<Bill>,
  ) {}

  async findAll(): Promise<Array<Bill>> {
    return await this.billsRepository.find();
  }

  async findAllByAtributeFilter(
    atribute: string,
    filter: string,
  ): Promise<Array<Bill>> {
    return await this.billsRepository.find(Utils.findParam(atribute, filter));
  }

  async saveBill(bill: BillDto) {
    return await this.billsRepository.save(bill);
  }
}
