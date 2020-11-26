import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AutomaticBillingService } from './automaticBilling.service';
import { AutomaticBillingForm } from './interfaces/automaticBilling.form';

@Controller('/automatic-billing')
export class AutomaticBillingController {
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

  @Post('/register-month')
  registerMonthBilling() {
    return this.automaticBillingService.registerMonthBills();
  }
}
