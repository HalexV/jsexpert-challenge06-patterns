import { describe, it, expect } from '@jest/globals';
import { creditCodes } from '../../../src/shared/constants/creditCodes';
import { Product } from '../../../src/shared/paymentComponents/IPaymentComponent';
import { Credit } from '../../../src/shared/queueComponents/InMemory/InMemoryOrderQueue';
import getCredits from '../../../src/shared/utils/getCredits';

describe('Utils - Get Credits Function', () => {
  it('should return a credits array', () => {
    const productList: Product[] = [
      {
        id: '0',
        name: creditCodes['0'],
        quantity: 5,
        unitPrice: 0.05,
      },
      {
        id: '1',
        name: creditCodes['1'],
        quantity: 7,
        unitPrice: 0.05,
      },
      {
        id: '2',
        name: creditCodes['2'],
        quantity: 6,
        unitPrice: 0.05,
      },
    ];

    const expectedResult: Credit[] = [
      {
        id: productList[0].id,
        quantity: productList[0].quantity,
      },
      {
        id: productList[1].id,
        quantity: productList[1].quantity,
      },
      {
        id: productList[2].id,
        quantity: productList[2].quantity,
      },
    ];

    const result = getCredits(productList);

    expect(result).toEqual(expectedResult);
  });
});
