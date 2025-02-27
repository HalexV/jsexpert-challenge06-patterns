/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { randomUUID } from 'node:crypto';

import ICreateMessageDTO from '../../dtos/ICreateMessageDTO';
import IUpdateMessageDTO from '../../dtos/IUpdateMessageDTO';
import Message from '../../model/Message';
import IMessagesRepository from '../IMessagesRepository';

export default class InMemoryMessagesRepository implements IMessagesRepository {
  private readonly messages: Message[];

  private static INSTANCE: InMemoryMessagesRepository;

  private constructor() {
    this.messages = [];
  }

  // !@ Singleton
  public static getInstance(): InMemoryMessagesRepository {
    if (!InMemoryMessagesRepository.INSTANCE)
      InMemoryMessagesRepository.INSTANCE = new InMemoryMessagesRepository();

    return InMemoryMessagesRepository.INSTANCE;
  }

  deleteAll(): void {
    while (this.messages.length !== 0) {
      this.messages.pop();
    }
  }

  create({
    contactId,
    content,
    status,
    type,
    userId,
  }: ICreateMessageDTO): Message {
    const message = new Message();

    const date = new Date();

    const data: Partial<Message> = {
      id: randomUUID({
        disableEntropyCache: true,
      }),
      userId,
      contactId,
      content,
      status,
      type,
      createdAt: date,
      updatedAt: date,
    };

    Object.assign(message, data);

    this.messages.push(message);

    return message;
  }

  update(messageId: string, { content }: IUpdateMessageDTO): Message {
    const message = this.findById(messageId);

    if (!message) throw new Error('Message not found!');

    if (content) {
      message.content = content;
      message.updatedAt = new Date();
      return message;
    }

    return message;
  }

  findById(messageId: string): Message | undefined {
    return this.messages.find((message) => message.id === messageId);
  }

  delete(messageId: string): true {
    const message = this.findById(messageId);

    if (!message) throw new Error('Message not found!');

    const messageIndex = this.messages.findIndex(
      (messageObj) => messageObj.id === message.id
    );

    this.messages.splice(messageIndex, 1);

    return true;
  }
}
