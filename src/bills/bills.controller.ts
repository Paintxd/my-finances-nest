import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BillDto } from 'src/bills/interfaces/bill-dto';
import { BillsService } from 'src/bills/bills.service';

@Controller('/bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Get('/findAll')
  findAllBills() {
    return this.billsService.findAll();
  }

  @Get('/findAll/:atribute/:filter')
  findAllByAtributeFilter(
    @Param('atribute') atribute: string,
    @Param('filter') filter: string,
  ) {
    return this.billsService.findAllByAtributeFilter(atribute, filter);
  }

  @Post('/save')
  saveBill(@Body() bill: BillDto) {
    return this.billsService.saveBill(bill);
  }
}
