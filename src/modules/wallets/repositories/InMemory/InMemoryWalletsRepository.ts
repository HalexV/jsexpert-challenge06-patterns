/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import ICreateWalletDTO from '../../dtos/ICreateWalletDTO';
import IUpdateWalletDTO from '../../dtos/IUpdateWalletDTO';
import Wallet from '../../model/Wallet';
import IWalletsRepository from '../IWalletsRepository';

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
    throw new Error('Not Implemented');
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
