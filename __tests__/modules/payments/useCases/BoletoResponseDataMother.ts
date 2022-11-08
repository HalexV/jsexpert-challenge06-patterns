/* eslint-disable @typescript-eslint/no-extraneous-class */
import { IBoletoResponse } from '../../../../src/shared/paymentComponents/IPaymentComponent';
import BoletoResponseDataBuilder from './BoletoResponseDataBuilder';

export default class BoletoResponseDataMother {
  static valid(): IBoletoResponse {
    return BoletoResponseDataBuilder.aBoletoResponse().build();
  }
}
