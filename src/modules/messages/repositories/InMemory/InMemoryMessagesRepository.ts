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

  update(userId: string, data: IUpdateMessageDTO): Message {
    throw new Error('Not Implemented');
  }

  findById(userId: string): Message | undefined {
    throw new Error('Not Implemented');
  }

  delete(userId: string): true {
    throw new Error('Not Implemented');
  }
}
