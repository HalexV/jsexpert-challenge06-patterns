import { describe, it, expect } from '@jest/globals';
import Wallet from '../../../../src/modules/wallets/model/Wallet';

describe('Model - Wallet', () => {
  it('should return a default wallet', () => {
    const wallet = new Wallet();
    const defaultDate = new Date('2000-01-01');

    const expectedDefaultWallet: Wallet = {
      id: 'no id',
      userId: 'no userId',
      email: 0,
      sms: 0,
      whatsapp: 0,
      createdAt: defaultDate,
      updatedAt: defaultDate,
    };

    expect(wallet).toEqual(expectedDefaultWallet);
  });
});
