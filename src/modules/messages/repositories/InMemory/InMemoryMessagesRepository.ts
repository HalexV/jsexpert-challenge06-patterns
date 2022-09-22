/* eslint-disable @typescript-eslint/strict-boolean-expressions */

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

  create(data: ICreateMessageDTO): Message {
    throw new Error('Not Implemented');
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
