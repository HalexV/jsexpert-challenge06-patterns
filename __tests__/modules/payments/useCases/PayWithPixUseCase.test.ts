import { describe, it, expect, jest } from '@jest/globals';
import PayWithPixUseCase from '../../../../src/modules/payments/useCases/PayWithPixUseCase';
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
import BoletoResponseDataMother from './BoletoResponseDataMother';
import CreditCardResponseDataMother from './CreditCardResponseDataMother';
import PixDTODataMother from './PixDTODataMother';
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
  sut: PayWithPixUseCase;
  paymentComponentStub: IPaymentComponent;
  orderQueueComponentStub: IQueueComponent;
}

const makeSut = (): SutTypes => {
  const paymentComponentStub = makePaymentComponent();
  const orderQueueComponentStub = makeOrderQueueComponent();
  const sut = new PayWithPixUseCase(
    paymentComponentStub,
    orderQueueComponentStub
  );

  return {
    sut,
    paymentComponentStub,
    orderQueueComponentStub,
  };
};

describe('Use Cases - Pay with pix', () => {
  it('should call payWithPix with correct arguments', async () => {
    const { sut, paymentComponentStub } = makeSut();

    const payWithPixSpy = jest.spyOn(paymentComponentStub, 'payWithPix');

    const expectedArguments = PixDTODataMother.valid();

    const userId = '1234';

    await sut.execute({
      userId,
      customerName: expectedArguments.customerName,
      productList: expectedArguments.productList,
    });

    expect(payWithPixSpy).toHaveBeenCalledWith(expectedArguments);
  });

  it('should throw if payWithPix throws', async () => {
    const { sut, paymentComponentStub } = makeSut();

    jest
      .spyOn(paymentComponentStub, 'payWithPix')
      .mockRejectedValueOnce(new Error());

    const { customerName, productList } = PixDTODataMother.valid();

    const userId = '1234';

    const promise = sut.execute({
      userId,
      customerName,
      productList,
    });

    await expect(promise).rejects.toThrowError();
  });

  it('should call orderQueue add with correct arguments', async () => {
    const { sut, orderQueueComponentStub } = makeSut();

    const orderQueueAddSpy = jest.spyOn(orderQueueComponentStub, 'add');
    const { transactionCode } = PixResponseDataMother.valid();
    const { productList, customerName } = PixDTODataMother.valid();

    const credits = getCredits(productList);

    const userId = '1234';

    const expectedArguments: Order = {
      type: 'pix',
      credits,
      transactionCode,
      userId,
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
    const { productList, customerName } = PixDTODataMother.valid();

    const userId = '1234';

    const promise = sut.execute({
      userId,
      customerName,
      productList,
    });

    await expect(promise).rejects.toThrowError();
  });

  it('should return pix data on success', async () => {
    const { sut } = makeSut();

    const { productList, customerName } = PixDTODataMother.valid();

    const userId = '1234';

    const expectedResult = PixResponseDataMother.valid();

    const result = await sut.execute({
      userId,
      customerName,
      productList,
    });

    expect(result).toEqual(expectedResult);
  });
});
