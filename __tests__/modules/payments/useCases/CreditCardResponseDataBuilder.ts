import { ICreditCardResponse } from '../../../../src/shared/paymentComponents/IPaymentComponent';

export default class CreditCardResponseDataBuilder {
  creditCardResponse: ICreditCardResponse;

  private constructor() {
    this.creditCardResponse = {
      transactionCode: '12k3ljk3440t93j0slkjvfdifgjo',
    };
  }

  static aCreditCardResponse(): CreditCardResponseDataBuilder {
    return new CreditCardResponseDataBuilder();
  }

  build(): ICreditCardResponse {
    return this.creditCardResponse;
  }
}
