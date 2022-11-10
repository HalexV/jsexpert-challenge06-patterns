import IPaymentComponent, {
  Product,
} from '../../../shared/paymentComponents/IPaymentComponent';
import IQueueComponent from '../../../shared/queueComponents/IQueueComponent';

interface IRequest {
  userId: string;
  customerName: string;
  productList: Product[];
}

export default class PayWithPixUseCase {
  constructor(
    private readonly paymentComponent: IPaymentComponent,
    private readonly orderQueue: IQueueComponent
  ) {}

  async execute({ userId, customerName, productList }: IRequest): Promise<any> {
    await this.paymentComponent.payWithPix({
      customerName,
      productList,
    });
  }
}
