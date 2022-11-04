import { Order } from '../../../../src/shared/queueComponents/InMemory/InMemoryOrderQueue';

export default class OrderDataBuilder {
  private readonly orderData: Order;

  private constructor() {
    this.orderData = {
      type: 'cc',
      userId: '1234',
      transactionCode: '123asd',
      credits: [
        {
          id: '0',
          quantity: 5,
        },
      ],
    };
  }

  static anOrderData(): OrderDataBuilder {
    return new OrderDataBuilder();
  }

  withPaymentTypePix(): OrderDataBuilder {
    Object.assign({}, this.orderData, {
      type: 'pix',
    });
    return this;
  }

  build(): Order {
    return this.orderData;
  }
}
