import { Bill } from 'src/Bills/bill';

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
}
