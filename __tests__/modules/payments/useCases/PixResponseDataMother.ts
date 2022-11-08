/* eslint-disable @typescript-eslint/no-extraneous-class */
import { IPixResponse } from '../../../../src/shared/paymentComponents/IPaymentComponent';
import PixResponseDataBuilder from './PixResponseDataBuilder';

export default class PixResponseDataMother {
  static valid(): IPixResponse {
    return PixResponseDataBuilder.aPixResponse().build();
  }
}
