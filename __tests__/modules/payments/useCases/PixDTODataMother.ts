/* eslint-disable @typescript-eslint/no-extraneous-class */
import { IPayWithPixDTO } from '../../../../src/shared/paymentComponents/IPaymentComponent';
import PixDTODataBuilder from './PixDTODataBuilder';

export default class PixDTODataMother {
  static valid(): IPayWithPixDTO {
    return PixDTODataBuilder.aPixDTOData().build();
  }
}
