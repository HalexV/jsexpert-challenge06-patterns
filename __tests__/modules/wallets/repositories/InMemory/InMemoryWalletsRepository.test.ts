import {
  describe,
  it,
  expect,
  beforeAll,
  jest,
  afterEach,
} from '@jest/globals';
import Wallet from '../../../../../src/modules/wallets/model/Wallet';
import InMemoryWalletsRepository from '../../../../../src/modules/wallets/repositories/InMemory/InMemoryWalletsRepository';
import WalletDataMother from './WalletDataMother';

import crypto from 'crypto';

describe('Repositories - InMemoryWalletsRepository', () => {
  let inMemoryWalletsRepository: InMemoryWalletsRepository;
  let updateDateMock: Date;

  beforeAll(() => {
    inMemoryWalletsRepository = InMemoryWalletsRepository.getInstance();
    updateDateMock = new Date('2022-01-01');
  });

  afterEach(() => {
    inMemoryWalletsRepository.deleteAll();
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
    it('should find a wallet by user id', () => {
      const walletData = WalletDataMother.valid();
      const wallet = inMemoryWalletsRepository.create({
        userId: walletData.userId,
      });

      const userId = wallet.userId;

      const walletFound = inMemoryWalletsRepository.findById(userId) as Wallet;

      expect(walletFound).toEqual(wallet);
    });

    it('should return undefined when wallet does not exist', () => {
      const nonexistentId = '987';
      const wallet = inMemoryWalletsRepository.findById(nonexistentId);

      expect(typeof wallet).toStrictEqual('undefined');
      expect(wallet).toBeFalsy();
    });
  });

  describe('update', () => {
    it('should throw an error when wallet does not exist', () => {
      const walletDataUpdated = WalletDataMother.withUpdatedData();
      const updateData = {
        email: walletDataUpdated.email,
        sms: walletDataUpdated.sms,
        whatsapp: walletDataUpdated.whatsapp,
      };

      const userId = 'invalid';

      expect(() =>
        inMemoryWalletsRepository.update(userId, updateData)
      ).toThrow('Wallet not found!');
    });

    it('should update a wallet by user id', () => {
      const walletDataUpdated = WalletDataMother.withUpdatedData();
      const wallet = inMemoryWalletsRepository.create({
        userId: walletDataUpdated.userId,
      });

      jest.useFakeTimers({
        now: updateDateMock,
      });

      const updateData = {
        email: walletDataUpdated.email,
        sms: walletDataUpdated.sms,
        whatsapp: walletDataUpdated.whatsapp,
      };

      const expectedWallet: Wallet = {
        id: wallet.id,
        userId: wallet.userId,
        email: updateData.email,
        sms: updateData.sms,
        whatsapp: updateData.whatsapp,
        createdAt: wallet.createdAt,
        updatedAt: updateDateMock,
      };

      const updatedWallet = inMemoryWalletsRepository.update(
        wallet.userId,
        updateData
      );

      expect(updatedWallet).toEqual(expectedWallet);
    });

    it('should just return the wallet when update data is empty', () => {
      const walletData = WalletDataMother.valid();
      const updateData = {};

      const wallet = inMemoryWalletsRepository.create({
        userId: walletData.userId,
      });

      jest.useFakeTimers({
        now: updateDateMock,
      });

      const notUpdatedWallet = inMemoryWalletsRepository.update(
        wallet.userId,
        updateData
      );

      expect(notUpdatedWallet).toEqual(wallet);
    });
  });

  describe('delete', () => {
    it('should throw an error when wallet does not exist', () => {
      const userId = 'invalid';
      expect(() => inMemoryWalletsRepository.delete(userId)).toThrow(
        'Wallet not found!'
      );
    });

    it('should delete a wallet', () => {
      const walletData = WalletDataMother.valid();
      const wallet = inMemoryWalletsRepository.create({
        userId: walletData.userId,
      });

      const deleteResult = inMemoryWalletsRepository.delete(wallet.userId);

      const findResult = inMemoryWalletsRepository.findById(wallet.userId);

      expect(deleteResult).toBeTruthy();
      expect(typeof findResult).toStrictEqual('undefined');
    });
  });

  describe('deleteAll', () => {
    it('should delete all data', () => {
      const userIds = ['1234', '4321'];
      const wallet1 = inMemoryWalletsRepository.create({
        userId: userIds[0],
      });

      const wallet2 = inMemoryWalletsRepository.create({
        userId: userIds[1],
      });

      inMemoryWalletsRepository.deleteAll();

      const walletNotFound1 = inMemoryWalletsRepository.findById(
        wallet1.userId
      );
      const walletNotFound2 = inMemoryWalletsRepository.findById(
        wallet2.userId
      );

      expect(walletNotFound1).toBeFalsy();
      expect(walletNotFound2).toBeFalsy();
    });
  });
});
