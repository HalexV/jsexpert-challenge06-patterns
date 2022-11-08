import { IPayWithBoletoDTO } from '../../../../src/shared/paymentComponents/IPaymentComponent';
import { creditCodes } from '../../../../src/shared/constants/creditCodes';

export default class BoletoDTODataBuilder {
  private readonly boletoDTO: IPayWithBoletoDTO;

  private constructor() {
    this.boletoDTO = {
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

  static aBoletoDTOData(): BoletoDTODataBuilder {
    return new BoletoDTODataBuilder();
  }

  build(): IPayWithBoletoDTO {
    return this.boletoDTO;
  }
}
