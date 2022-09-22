export default class Message {
  id: String;
  userId: String;
  contactId: String;
  content: String;
  type: 'email' | 'sms' | 'whatsapp';
  status: 'received' | 'sent';
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = 'no id';
    this.userId = 'no userId';
    this.contactId = 'no contactId';
    this.content = '';
    this.type = 'email';
    this.status = 'received';
    this.createdAt = new Date('2000-01-01');
    this.updatedAt = this.createdAt;
  }
}
