export default class Wallet {
  id: string;
  userId: string;
  email: Number;
  sms: Number;
  whatsapp: Number;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = 'no id';
    this.userId = 'no userId';
    this.email = 0;
    this.sms = 0;
    this.whatsapp = 0;
    this.createdAt = new Date('2000-01-01');
    this.updatedAt = this.createdAt;
  }
}
