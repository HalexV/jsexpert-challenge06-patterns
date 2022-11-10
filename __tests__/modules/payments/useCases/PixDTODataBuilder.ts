import { creditCodes } from '../../../../src/shared/constants/creditCodes';
import { IPayWithPixDTO } from '../../../../src/shared/paymentComponents/IPaymentComponent';

export default class PixDTODataBuilder {
  pixDTO: IPayWithPixDTO;

  private constructor() {
    this.pixDTO = {
      customerName: 'Charles Alvin',
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

  static aPixDTOData(): PixDTODataBuilder {
    return new PixDTODataBuilder();
  }

  build(): IPayWithPixDTO {
    return this.pixDTO;
  }
}
