import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AutomaticBillingService } from './automaticBilling.service';
import { AutomaticBillingForm } from './automaticBilling.form';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/automatic-billing')
export class AutomaticBillingController {
  private readonly logger = new Logger();
  constructor(
    private readonly automaticBillingService: AutomaticBillingService,
  ) {}

  @Get('/findAll')
  findAllAutomaticBills() {
    this.logger.log('Iniciando busca de todas automatic-billings');
    return this.automaticBillingService.findAll();
  }

  @Get('/findAll/active')
  findActives() {
    this.logger.log('Iniciando busca de todas automatic-billings ativas');
    return this.automaticBillingService.findActives();
  }

  @Patch('/inactive/:id')
  inactiveAutomaticBilling(@Param('id') id: number) {
    this.logger.log(`Desativando automatic-billing id - ${id}`);
    return this.automaticBillingService.inactiveBill(id);
  }

  @Post('/save')
  saveAutomaticBill(@Body() automaticBillingDto: AutomaticBillingForm) {
    this.logger.log(
      `Salvando nova automatic-billing - ${JSON.stringify(
        automaticBillingDto,
      )}`,
    );
    return this.automaticBillingService.saveBill(automaticBillingDto);
  }

  @Cron('0 0 1 * *') // run every 1st day of the month
  async registerMonthBilling() {
    this.logger.log('Starting aumatic billing month job');
    const resp = await this.automaticBillingService.registerMonthBills();
    resp
      ? this.logger.log(
          `Success on task job -- result: ${JSON.stringify(resp)}`,
        )
      : this.logger.error('Error on task job');
  }
}
