interface MessageData {
  id: string;
  userId: string;
  contactId: string;
  content: string;
  type: 'email' | 'sms' | 'whatsapp';
  status: 'received' | 'sent';
  createdAt: Date;
  updatedAt: Date;
}

export default class MessageDataBuilder {
  private readonly messageData: MessageData;

  private constructor() {
    const dateNow = new Date('2022-01-01');

    this.messageData = {
      id: '4321',
      userId: '1234',
      createdAt: dateNow,
      updatedAt: dateNow,
      contactId: '1235',
      content: 'some content',
      type: 'email',
      status: 'received',
    };
  }

  static aMessageData(): MessageDataBuilder {
    return new MessageDataBuilder();
  }

  build(): MessageData {
    return this.messageData;
  }
}

export { MessageData };
