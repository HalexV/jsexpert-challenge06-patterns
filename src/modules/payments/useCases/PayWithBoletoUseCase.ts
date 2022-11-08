import IPaymentComponent, {
  Product,
} from '../../../shared/paymentComponents/IPaymentComponent';
import IQueueComponent from '../../../shared/queueComponents/IQueueComponent';

interface IRequest {
  userId: string;
  customerName: string;
  productList: Product[];
}

export default class PayWithBoletoUseCase {
  constructor(
    private readonly paymentComponent: IPaymentComponent,
    orderQueue: IQueueComponent
  ) {}

  async execute({ userId, customerName, productList }: IRequest): Promise<any> {
    await this.paymentComponent.payWithBoleto({
      customerName,
      productList,
    });
  }
}
