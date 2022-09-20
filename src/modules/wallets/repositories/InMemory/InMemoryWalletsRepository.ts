/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import ICreateWalletDTO from '../../dtos/ICreateWalletDTO';
import IUpdateWalletDTO from '../../dtos/IUpdateWalletDTO';
import Wallet from '../../model/Wallet';
import IWalletsRepository from '../IWalletsRepository';

import { randomUUID } from 'crypto';

export default class InMemoryWalletsRepository implements IWalletsRepository {
  private readonly wallets: Wallet[];

  private static INSTANCE: InMemoryWalletsRepository;

  private constructor() {
    this.wallets = [];
  }

  // !@ Singleton
  public static getInstance(): InMemoryWalletsRepository {
    if (!InMemoryWalletsRepository.INSTANCE)
      InMemoryWalletsRepository.INSTANCE = new InMemoryWalletsRepository();

    return InMemoryWalletsRepository.INSTANCE;
  }

  deleteAll(): void {
    while (this.wallets.length !== 0) {
      this.wallets.pop();
    }
  }

  create({ userId }: ICreateWalletDTO): Wallet {
    const wallet = new Wallet();

    const date = new Date();

    const data: Partial<Wallet> = {
      id: randomUUID({
        disableEntropyCache: true,
      }),
      userId,
      createdAt: date,
      updatedAt: date,
    };

    Object.assign(wallet, data);

    this.wallets.push(wallet);

    return wallet;
  }

  update(userId: string, { email, sms, whatsapp }: IUpdateWalletDTO): Wallet {
    let updated = false;
    const wallet = this.findById(userId);

    if (!wallet) throw new Error('Wallet not found!');

    if (email) {
      updated = true;
      wallet.email = email;
    }

    if (sms) {
      updated = true;
      wallet.sms = sms;
    }

    if (whatsapp) {
      updated = true;
      wallet.whatsapp = whatsapp;
    }

    if (updated) {
      wallet.updatedAt = new Date();
      return wallet;
    }

    return wallet;
  }

  findById(userId: string): Wallet | undefined {
    return this.wallets.find((wallet) => wallet.userId === userId);
  }

  delete(userId: string): true {
    throw new Error('Wallet not found!');
  }
}
