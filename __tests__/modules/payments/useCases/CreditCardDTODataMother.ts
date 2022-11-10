/* eslint-disable @typescript-eslint/no-extraneous-class */
import { IPayWithCreditCardDTO } from '../../../../src/shared/paymentComponents/IPaymentComponent';
import CreditCardDTODataBuilder from './CreditCardDTODataBuilder';

export default class CreditCardDTODataMother {
  static valid(): IPayWithCreditCardDTO {
    return CreditCardDTODataBuilder.aCreditCardDTOData().build();
  }
}
