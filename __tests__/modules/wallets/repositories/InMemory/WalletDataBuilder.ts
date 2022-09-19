interface WalletData {
  id: string;
  userId: string;
  email: Number;
  sms: Number;
  whatsapp: Number;
  createdAt: Date;
  updatedAt: Date;
}

export default class WalletDataBuilder {
  private readonly walletData;

  private constructor() {
    const dateNow = new Date('2022-01-01');

    this.walletData = {
      id: '4321',
      userId: '1234',
      email: 0,
      sms: 0,
      whatsapp: 0,
      createdAt: dateNow,
      updatedAt: dateNow,
    };
  }

  static aWalletData(): WalletDataBuilder {
    return new WalletDataBuilder();
  }

  withUpdatedData(): WalletDataBuilder {
    Object.assign(this.walletData, {
      email: 1,
      sms: 1,
      whatsapp: 1,
      updateAt: new Date('2022-01-02'),
    });
    return this;
  }

  build(): WalletData {
    return this.walletData;
  }
}

export { WalletData };
