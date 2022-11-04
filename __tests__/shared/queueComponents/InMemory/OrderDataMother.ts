/* eslint-disable @typescript-eslint/no-extraneous-class */

import { Order } from '../../../../src/shared/queueComponents/InMemory/InMemoryOrderQueue';
import OrderDataBuilder from './OrderDataBuilder';

export default class OrderDataMother {
  static valid(): Order {
    return OrderDataBuilder.anOrderData().build();
  }

  static validWithPaymentTypePix(): Order {
    return OrderDataBuilder.anOrderData().withPaymentTypePix().build();
  }
}
