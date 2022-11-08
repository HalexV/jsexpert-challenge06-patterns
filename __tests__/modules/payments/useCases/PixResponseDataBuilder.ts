import { IPixResponse } from '../../../../src/shared/paymentComponents/IPaymentComponent';

export default class PixResponseDataBuilder {
  pixResponse: IPixResponse;

  private constructor() {
    this.pixResponse = {
      qrcode: 'oijoiodakj10230129309djsdfj3gjp34opowekjoeieirsdojdj',
      transactionCode: '12093u0jf0gno8230pasdkklpoqw',
    };
  }

  static aPixResponse(): PixResponseDataBuilder {
    return new PixResponseDataBuilder();
  }

  build(): IPixResponse {
    return this.pixResponse;
  }
}
