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

interface PixData {
  qrcode: string;
  transactionCode: string;
}

export default class PayWithPixUseCase {
  constructor(
    private readonly paymentComponent: IPaymentComponent,
    private readonly orderQueue: IQueueComponent
  ) {}

  async execute({
    userId,
    customerName,
    productList,
  }: IRequest): Promise<PixData> {
    const pixResponse = await this.paymentComponent.payWithPix({
      customerName,
      productList,
    });

    const credits = getCredits(productList);

    const order: Order = {
      userId,
      type: 'pix',
      transactionCode: pixResponse.transactionCode,
      credits,
    };

    await this.orderQueue.add(order);

    return pixResponse;
  }
}
