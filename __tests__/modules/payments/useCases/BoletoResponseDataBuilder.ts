import { IBoletoResponse } from '../../../../src/shared/paymentComponents/IPaymentComponent';

export default class BoletoResponseDataBuilder {
  private readonly boletoResponse: IBoletoResponse;

  private constructor() {
    this.boletoResponse = {
      boletoCode: '12309102398103980920',
      boletoDoc: 'akmclk1i23109jjfknlsdkmci1230912jjdpadçlvmçlfkgewpr',
    };
  }

  static aBoletoResponse(): BoletoResponseDataBuilder {
    return new BoletoResponseDataBuilder();
  }

  build(): IBoletoResponse {
    return this.boletoResponse;
  }
}
