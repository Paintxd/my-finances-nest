import { Bill } from 'src/bills/bill';

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
    const date: string = new Date(result.date).toLocaleDateString('pt-BR');

    return { ...result, date: date };
  }
}
