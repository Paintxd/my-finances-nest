import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AutomaticBillingService } from './automaticBilling.service';
import { AutomaticBillingForm } from './interfaces/automaticBilling.form';

@Controller('/automatic-billing')
export class AutomaticBillingController {
  private readonly logger = new Logger();
  constructor(
    private readonly automaticBillingService: AutomaticBillingService,
  ) {}

  @Get('/findAll')
  findAllAutomaticBills() {
    return this.automaticBillingService.findAll();
  }

  @Get('/findAll/active')
  findActives() {
    return this.automaticBillingService.findActives();
  }

  @Patch('/inactive/:id')
  inactiveAutomaticBilling(@Param('id') id: number) {
    return this.automaticBillingService.inactiveBill(id);
  }

  @Post('/save')
  saveAutomaticBill(@Body() automaticBillingDto: AutomaticBillingForm) {
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
