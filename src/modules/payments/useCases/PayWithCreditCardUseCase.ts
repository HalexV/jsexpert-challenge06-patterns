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
  creditCardData: {
    cardNumber: string;
    expireDate: string;
    ownerName: string;
    secureCode: string;
  };
}

export default class PayWithCreditCardUseCase {
  constructor(
    private readonly paymentComponent: IPaymentComponent,
    private readonly orderQueue: IQueueComponent
  ) {}

  async execute({
    userId,
    customerName,
    productList,
    creditCardData,
  }: IRequest): Promise<any> {
    const { cardNumber, expireDate, ownerName, secureCode } = creditCardData;
    const { transactionCode } = await this.paymentComponent.payWithCreditCard({
      cardNumber,
      expireDate,
      ownerName,
      secureCode,
      productList,
    });

    const credits = getCredits(productList);

    const order: Order = {
      userId,
      type: 'cc',
      transactionCode,
      credits,
    };

    await this.orderQueue.add(order);
  }
}
