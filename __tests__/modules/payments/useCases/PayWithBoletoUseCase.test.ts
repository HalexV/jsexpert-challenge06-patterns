import { describe, it, expect, jest } from '@jest/globals';
import PayWithBoletoUseCase from '../../../../src/modules/payments/useCases/PayWithBoletoUseCase';
import IPaymentComponent, {
  IBoletoResponse,
  ICreditCardResponse,
  IPayWithBoletoDTO,
  IPayWithCreditCardDTO,
  IPayWithPixDTO,
  IPixResponse,
} from '../../../../src/shared/paymentComponents/IPaymentComponent';
import { Order } from '../../../../src/shared/queueComponents/InMemory/InMemoryOrderQueue';
import IQueueComponent from '../../../../src/shared/queueComponents/IQueueComponent';
import OrderDataMother from '../../../shared/queueComponents/InMemory/OrderDataMother';
import BoletoDTODataMother from './BoletoDTODataMother';
import BoletoResponseDataMother from './BoletoResponseDataMother';
import CreditCardResponseDataMother from './CreditCardResponseDataMother';
import PixResponseDataMother from './PixResponseDataMother';

const makePaymentComponent = (): IPaymentComponent => {
  class PaymentComponentStub implements IPaymentComponent {
    async payWithBoleto(data: IPayWithBoletoDTO): Promise<IBoletoResponse> {
      return await new Promise((resolve) =>
        resolve(BoletoResponseDataMother.valid())
      );
    }

    async payWithCreditCard(
      data: IPayWithCreditCardDTO
    ): Promise<ICreditCardResponse> {
      return await new Promise((resolve) =>
        resolve(CreditCardResponseDataMother.valid())
      );
    }

    async payWithPix(data: IPayWithPixDTO): Promise<IPixResponse> {
      return await new Promise((resolve) =>
        resolve(PixResponseDataMother.valid())
      );
    }
  }

  return new PaymentComponentStub();
};

const makeOrderQueueComponent = (): IQueueComponent => {
  class OrderQueueComponentStub implements IQueueComponent {
    async add(data: any): Promise<true> {
      return await new Promise((resolve) => resolve(true));
    }

    async get(): Promise<Order> {
      return await new Promise((resolve) => resolve(OrderDataMother.valid()));
    }
  }

  return new OrderQueueComponentStub();
};

interface SutTypes {
  sut: PayWithBoletoUseCase;
  paymentComponentStub: IPaymentComponent;
  orderQueueComponentStub: IQueueComponent;
}

const makeSut = (): SutTypes => {
  const paymentComponentStub = makePaymentComponent();
  const orderQueueComponentStub = makeOrderQueueComponent();
  const sut = new PayWithBoletoUseCase(
    paymentComponentStub,
    orderQueueComponentStub
  );

  return {
    sut,
    paymentComponentStub,
    orderQueueComponentStub,
  };
};

describe('Use Cases - Pay with boleto use case', () => {
  it('should call payWithBoleto with correct arguments', async () => {
    const { sut, paymentComponentStub } = makeSut();

    const payWithBoletoSpy = jest.spyOn(paymentComponentStub, 'payWithBoleto');

    const expectedArguments = BoletoDTODataMother.valid();

    await sut.execute({
      userId: '1234',
      customerName: expectedArguments.customerName,
      productList: expectedArguments.productList,
    });

    expect(payWithBoletoSpy).toBeCalledWith(expectedArguments);
  });
});
