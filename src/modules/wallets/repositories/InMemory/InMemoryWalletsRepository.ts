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
    throw new Error('Not Implemented');
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
    throw new Error('Not Implemented');
  }

  findById(userId: string): Wallet | undefined {
    throw new Error('Not Implemented');
  }

  delete(userId: string): true {
    throw new Error('Not Implemented');
  }
}
