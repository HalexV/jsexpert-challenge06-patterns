/* eslint-disable @typescript-eslint/no-extraneous-class */

import WalletDataBuilder, { WalletData } from './WalletDataBuilder';

export default class WalletDataMother {
  static valid(): WalletData {
    return WalletDataBuilder.aWalletData().build();
  }
}
