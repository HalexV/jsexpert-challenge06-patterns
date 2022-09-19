import { describe, it, expect, beforeAll, jest } from '@jest/globals';
import Wallet from '../../../../../src/modules/wallets/model/Wallet';
import InMemoryWalletsRepository from '../../../../../src/modules/wallets/repositories/InMemory/InMemoryWalletsRepository';
import WalletDataMother from './WalletDataMother';

import crypto from 'crypto';

describe('Repositories - InMemoryWalletsRepository', () => {
  let inMemoryWalletsRepository: InMemoryWalletsRepository;

  beforeAll(() => {
    inMemoryWalletsRepository = InMemoryWalletsRepository.getInstance();
  });

  describe('getInstance', () => {
    it('should return the InMemoryWalletsRepository on first call', () => {
      expect(inMemoryWalletsRepository).toBeInstanceOf(
        InMemoryWalletsRepository
      );
    });

    it('should return the same InMemoryWalletsRepository on another calls', () => {
      const inMemoryWalletsRepositorySecondCall =
        InMemoryWalletsRepository.getInstance();

      expect(inMemoryWalletsRepositorySecondCall).toBe(
        inMemoryWalletsRepository
      );
    });
  });

  describe('create', () => {
    it('should create a wallet', () => {
      const walletData = WalletDataMother.valid();

      jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce(walletData.id);
      jest.useFakeTimers({
        now: walletData.createdAt,
      });

      const expectedWallet = walletData;

      const wallet = inMemoryWalletsRepository.create({
        userId: walletData.userId,
      });

      expect(wallet).toBeInstanceOf(Wallet);
      expect(wallet).toEqual(expectedWallet);
    });
  });

  describe('findById', () => {
    it('should return undefined when wallet does not exist', () => {
      const nonexistentId = '987';
      const wallet = inMemoryWalletsRepository.findById(nonexistentId);

      expect(typeof wallet).toStrictEqual('undefined');
      expect(wallet).toBeFalsy();
    });
  });
});
