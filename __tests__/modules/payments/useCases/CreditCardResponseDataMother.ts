/* eslint-disable @typescript-eslint/no-extraneous-class */

import { ICreditCardResponse } from '../../../../src/shared/paymentComponents/IPaymentComponent';
import CreditCardResponseDataBuilder from './CreditCardResponseDataBuilder';

export default class CreditCardResponseDataMother {
  static valid(): ICreditCardResponse {
    return CreditCardResponseDataBuilder.aCreditCardResponse().build();
  }
}
