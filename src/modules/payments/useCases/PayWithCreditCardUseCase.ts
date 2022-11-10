import IPaymentComponent, {
  Product,
} from '../../../shared/paymentComponents/IPaymentComponent';
import IQueueComponent from '../../../shared/queueComponents/IQueueComponent';

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
    await this.paymentComponent.payWithCreditCard({
      cardNumber,
      expireDate,
      ownerName,
      secureCode,
      productList,
    });
  }
}
