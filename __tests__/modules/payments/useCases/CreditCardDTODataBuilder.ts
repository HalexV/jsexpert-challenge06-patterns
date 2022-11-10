import { creditCodes } from '../../../../src/shared/constants/creditCodes';
import { IPayWithCreditCardDTO } from '../../../../src/shared/paymentComponents/IPaymentComponent';

export default class CreditCardDTODataBuilder {
  creditCardDTO: IPayWithCreditCardDTO;

  private constructor() {
    this.creditCardDTO = {
      cardNumber: '0000111100001111',
      expireDate: '01/27',
      ownerName: 'Charles Alvin',
      secureCode: '000',
      productList: [
        {
          id: '0',
          name: creditCodes['0'],
          quantity: 5,
          unitPrice: 0.05,
        },
        {
          id: '1',
          name: creditCodes['1'],
          quantity: 7,
          unitPrice: 0.05,
        },
        {
          id: '2',
          name: creditCodes['2'],
          quantity: 6,
          unitPrice: 0.05,
        },
      ],
    };
  }

  static aCreditCardDTOData(): CreditCardDTODataBuilder {
    return new CreditCardDTODataBuilder();
  }

  build(): IPayWithCreditCardDTO {
    return this.creditCardDTO;
  }
}
