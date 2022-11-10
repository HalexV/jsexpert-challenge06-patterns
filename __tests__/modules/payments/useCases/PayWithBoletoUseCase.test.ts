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
import getCredits from '../../../../src/shared/utils/getCredits';
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
    async add(data: Order): Promise<true> {
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

describe('Use Cases - Pay with boleto', () => {
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

  it('should throw if payWithBoleto throws', async () => {
    const { sut, paymentComponentStub } = makeSut();

    jest
      .spyOn(paymentComponentStub, 'payWithBoleto')
      .mockRejectedValueOnce(new Error());

    const expectedArguments = BoletoDTODataMother.valid();

    const promise = sut.execute({
      userId: '1234',
      customerName: expectedArguments.customerName,
      productList: expectedArguments.productList,
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call orderQueue add with correct arguments', async () => {
    const { sut, orderQueueComponentStub } = makeSut();

    const orderQueueAddSpy = jest.spyOn(orderQueueComponentStub, 'add');
    const payWithBoletoResponse = BoletoResponseDataMother.valid();
    const { productList, customerName } = BoletoDTODataMother.valid();

    const credits = getCredits(productList);

    const userId = '1234';

    const expectedArguments: Order = {
      type: 'bol',
      credits,
      transactionCode: payWithBoletoResponse.boletoCode,
      userId: '1234',
    };

    await sut.execute({
      userId,
      customerName,
      productList,
    });

    expect(orderQueueAddSpy).toHaveBeenCalledWith(expectedArguments);
  });

  it('should throw if orderQueue add throws', async () => {
    const { sut, orderQueueComponentStub } = makeSut();

    jest
      .spyOn(orderQueueComponentStub, 'add')
      .mockRejectedValueOnce(new Error());
    const { productList, customerName } = BoletoDTODataMother.valid();

    const userId = '1234';

    const promise = sut.execute({
      userId,
      customerName,
      productList,
    });

    await expect(promise).rejects.toThrow();
  });

  it('should return boleto data on success', async () => {
    const { sut } = makeSut();

    const { productList, customerName } = BoletoDTODataMother.valid();
    const userId = '1234';

    const { boletoCode, boletoDoc } = BoletoResponseDataMother.valid();

    const expectedResult = {
      boletoCode,
      boletoDoc,
    };

    const result = await sut.execute({
      userId,
      customerName,
      productList,
    });

    expect(result).toEqual(expectedResult);
  });
});
