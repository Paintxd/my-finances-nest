import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

  static billDateFormat(bill) {
    bill.date = format(new Date(bill.date), 'dd/MM/yyyy', { locale: ptBR });
    return bill;
  }
}
