import { Bill } from '../bills/bill';
import { BillForm } from '../bills/interfaces/bill.form';

export class Utils {
  static findParam(atribute: string, param: string) {
    let statement;

    switch (atribute) {
      case 'establishment':
        statement = { establishment: param };
        break;
      case 'type':
        statement = { type: param };
        break;
      case 'paymentMethod':
        statement = { paymentMethod: param };
        break;
    }

    return statement;
  }

  static billFormater(result): Bill {
    const dateSplited = new Date(result.date)
      .toLocaleDateString('pt-BR')
      .split('-');
    const temp = dateSplited[0];
    dateSplited[0] = dateSplited[2];
    dateSplited[2] = temp;
    dateSplited[1] =
      parseInt(dateSplited[1]) < 10 ? `0${dateSplited[1]}` : dateSplited[1];
    const date = dateSplited.join('/');

    return { ...result, date };
  }

  static installmentsDateReturn(date: string, monthCounter: number): string {
    const dateSplited = date.split('/'); // dd/MM/yyyy
    const month = parseInt(dateSplited[1]) + monthCounter;
    if (month > 12) {
      const yearIncrease = parseInt(dateSplited[2]) + Math.trunc(month / 12);
      dateSplited[2] = yearIncrease.toString();
    }
    dateSplited[1] = month % 12 === 0 ? '12' : (month % 12).toString();

    return dateSplited.reverse().join('/');
  }

  static billDateFormat(bill: BillForm): BillForm {
    const dateSplited = bill.date.split('/');
    const temp = dateSplited[1];
    dateSplited[1] = dateSplited[0];
    dateSplited[0] = temp;

    const date = dateSplited.join('/');
    return { ...bill, date };
  }
}
