import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BillForm } from './bill.form';
import { BillsService } from './bills.service';
import { Bill } from './bill';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Get('/findAll')
  findAllBills(): Promise<Bill[]> {
    return this.billsService.findAll();
  }

  @Get('/findAll/:atribute/:filter')
  findAllByAtributeFilter(
    @Param('atribute') atribute: string,
    @Param('filter') filter: string,
  ): Promise<Bill[]> {
    return this.billsService.findAllByAtributeFilter(atribute, filter);
  }

  @Post('/save')
  saveBill(@Body() bill: BillForm): Promise<Bill | Bill[]> {
    return this.billsService.saveBill(bill);
  }

  @Delete('/delete/:id')
  deleteBill(@Param('id') id: number) {
    return this.billsService.deleteBill(id);
  }
}
