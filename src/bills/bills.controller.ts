import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
  private logger = new Logger();
  constructor(private readonly billsService: BillsService) {}

  @Get('/findAll')
  findAllBills(): Promise<Bill[]> {
    this.logger.log('Iniciando busca de todas as bills');
    return this.billsService.findAll();
  }

  @Get('/findAll/:atribute/:filter')
  findAllByAtributeFilter(
    @Param('atribute') atribute: string,
    @Param('filter') filter: string,
  ): Promise<Bill[]> {
    this.logger.log(
      `Iniciando busca filtrada de todas as bills atributo - ${atribute} filtro - ${filter}`,
    );
    return this.billsService.findAllByAtributeFilter(atribute, filter);
  }

  @Post('/save')
  saveBill(@Body() bill: BillForm): Promise<Bill | Bill[]> {
    this.logger.log(`Salvando nova bill - ${JSON.stringify(bill)}`);
    return this.billsService.saveBill(bill);
  }

  @Delete('/delete/:id')
  deleteBill(@Param('id') id: number) {
    this.logger.log(`Deletando bill id - ${id}`);
    return this.billsService.deleteBill(id);
  }
}
