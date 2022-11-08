import IPaymentComponent, {
  Product,
} from '../../../shared/paymentComponents/IPaymentComponent';
import { Order } from '../../../shared/queueComponents/InMemory/InMemoryOrderQueue';
import IQueueComponent from '../../../shared/queueComponents/IQueueComponent';
import getCredits from '../../../shared/utils/getCredits';

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

    const credits = getCredits(productList);

    const order: Order = {
      type: 'bol',
      credits,
      transactionCode: boletoResponse.boletoCode,
      userId,
    };

    await this.orderQueue.add(order);
  }
}
