import IPaymentComponent, {
  Product,
} from '../../../shared/paymentComponents/IPaymentComponent';
import {
  Credit,
  Order,
} from '../../../shared/queueComponents/InMemory/InMemoryOrderQueue';
import IQueueComponent from '../../../shared/queueComponents/IQueueComponent';

interface IRequest {
  userId: string;
  customerName: string;
  productList: Product[];
}

export default class PayWithBoletoUseCase {
  constructor(
    private readonly paymentComponent: IPaymentComponent,
    private readonly orderQueue: IQueueComponent
  ) {}

  async execute({ userId, customerName, productList }: IRequest): Promise<any> {
    const boletoResponse = await this.paymentComponent.payWithBoleto({
      customerName,
      productList,
    });

    const credits: Credit[] = productList.map((product) => ({
      id: product.id,
      quantity: product.quantity,
    }));

    const order: Order = {
      type: 'bol',
      credits,
      transactionCode: boletoResponse.boletoCode,
      userId,
    };

    await this.orderQueue.add(order);
  }
}
