import ICreateWalletDTO from '../dtos/ICreateWalletDTO';
import IUpdateWalletDTO from '../dtos/IUpdateWalletDTO';
import Wallet from '../model/Wallet';

export default interface IWalletsRepository {
  create: ({ userId }: ICreateWalletDTO) => Wallet;
  update: (
    userId: string,
    { email, sms, whatsapp }: IUpdateWalletDTO
  ) => Wallet;
  findById: (userId: string) => Wallet | undefined;
  delete: (userId: string) => true;
}
