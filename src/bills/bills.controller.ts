import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BillForm } from 'src/bills/interfaces/bill-form';
import { BillsService } from 'src/bills/bills.service';
import { Bill } from './bill';

@Controller('/bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Get('/findAll')
  findAllBills(): Promise<Bill[]> {
    console.log('finding all bills');
    return this.billsService.findAll();
  }

  @Get('/findAll/:atribute/:filter')
  findAllByAtributeFilter(
    @Param('atribute') atribute: string,
    @Param('filter') filter: string,
  ): Promise<Bill[]> {
    console.log('finding bills filtered');
    return this.billsService.findAllByAtributeFilter(atribute, filter);
  }

  @Post('/save')
  saveBill(@Body() bill: BillForm): Promise<Bill | Bill[]> {
    console.log('saving bill');
    return this.billsService.saveBill(bill);
  }
}
