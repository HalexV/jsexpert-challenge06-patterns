import { describe, it, expect, jest } from '@jest/globals';
import PayWithCreditCardUseCase from '../../../../src/modules/payments/useCases/PayWithCreditCardUseCase';
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
import CreditCardDTODataMother from './CreditCardDTODataMother';
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
  sut: PayWithCreditCardUseCase;
  paymentComponentStub: IPaymentComponent;
  orderQueueComponentStub: IQueueComponent;
}

const makeSut = (): SutTypes => {
  const paymentComponentStub = makePaymentComponent();
  const orderQueueComponentStub = makeOrderQueueComponent();
  const sut = new PayWithCreditCardUseCase(
    paymentComponentStub,
    orderQueueComponentStub
  );

  return {
    sut,
    paymentComponentStub,
    orderQueueComponentStub,
  };
};

describe('Use Cases - Pay with credit card', () => {
  it('should call payWithCreditCard with correct arguments', async () => {
    const { sut, paymentComponentStub } = makeSut();
    const payWithCreditCardSpy = jest.spyOn(
      paymentComponentStub,
      'payWithCreditCard'
    );

    const payWithCreditCardDTO = CreditCardDTODataMother.valid();

    const expectedArguments = payWithCreditCardDTO;

    const userId = '1234';

    await sut.execute({
      userId,
      customerName: payWithCreditCardDTO.ownerName,
      productList: payWithCreditCardDTO.productList,
      creditCardData: {
        ownerName: payWithCreditCardDTO.ownerName,
        cardNumber: payWithCreditCardDTO.cardNumber,
        expireDate: payWithCreditCardDTO.expireDate,
        secureCode: payWithCreditCardDTO.secureCode,
      },
    });

    expect(payWithCreditCardSpy).toHaveBeenCalledWith(expectedArguments);
  });

  it('should throw if payWithCreditCard throws', async () => {
    const { sut, paymentComponentStub } = makeSut();
    jest
      .spyOn(paymentComponentStub, 'payWithCreditCard')
      .mockRejectedValueOnce(new Error());

    const payWithCreditCardDTO = CreditCardDTODataMother.valid();

    const userId = '1234';

    const promise = sut.execute({
      userId,
      customerName: payWithCreditCardDTO.ownerName,
      productList: payWithCreditCardDTO.productList,
      creditCardData: {
        ownerName: payWithCreditCardDTO.ownerName,
        cardNumber: payWithCreditCardDTO.cardNumber,
        expireDate: payWithCreditCardDTO.expireDate,
        secureCode: payWithCreditCardDTO.secureCode,
      },
    });

    await expect(promise).rejects.toThrowError();
  });

  it('should call orderQueue add with correct arguments', async () => {
    const { sut, orderQueueComponentStub } = makeSut();

    const orderQueueAddSpy = jest.spyOn(orderQueueComponentStub, 'add');
    const { transactionCode } = CreditCardResponseDataMother.valid();
    const { ownerName, productList, cardNumber, expireDate, secureCode } =
      CreditCardDTODataMother.valid();

    const credits = getCredits(productList);

    const userId = '1234';

    const expectedArguments: Order = {
      type: 'cc',
      credits,
      transactionCode,
      userId,
    };

    await sut.execute({
      userId,
      customerName: ownerName,
      productList,
      creditCardData: {
        ownerName,
        cardNumber,
        expireDate,
        secureCode,
      },
    });

    expect(orderQueueAddSpy).toHaveBeenCalledWith(expectedArguments);
  });

  it('should throw if orderQueue throws', async () => {
    const { sut, orderQueueComponentStub } = makeSut();

    jest
      .spyOn(orderQueueComponentStub, 'add')
      .mockRejectedValueOnce(new Error());
    const { ownerName, productList, cardNumber, expireDate, secureCode } =
      CreditCardDTODataMother.valid();

    const userId = '1234';

    const promise = sut.execute({
      userId,
      customerName: ownerName,
      productList,
      creditCardData: {
        ownerName,
        cardNumber,
        expireDate,
        secureCode,
      },
    });

    await expect(promise).rejects.toThrowError();
  });

  it('should return true on success', async () => {
    const { sut } = makeSut();

    const { ownerName, productList, cardNumber, expireDate, secureCode } =
      CreditCardDTODataMother.valid();

    const userId = '1234';

    const result = await sut.execute({
      userId,
      customerName: ownerName,
      productList,
      creditCardData: {
        ownerName,
        cardNumber,
        expireDate,
        secureCode,
      },
    });

    expect(result).toBeTruthy();
  });
});
