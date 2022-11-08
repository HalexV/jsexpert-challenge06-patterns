/* eslint-disable @typescript-eslint/no-extraneous-class */
import { IPayWithBoletoDTO } from '../../../../src/shared/paymentComponents/IPaymentComponent';
import BoletoDTODataBuilder from './BoletoDTODataBuilder';

export default class BoletoDTODataMother {
  static valid(): IPayWithBoletoDTO {
    return BoletoDTODataBuilder.aBoletoDTOData().build();
  }
}
