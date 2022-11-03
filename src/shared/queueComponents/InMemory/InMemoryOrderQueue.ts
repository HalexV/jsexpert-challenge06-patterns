/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import IQueueComponent from '../IQueueComponent';

interface Credit {
  id: string;
  quantity: number;
}

interface Order {
  type: 'cc' | 'bol' | 'pix';
  userId: string;
  transactionCode: string;
  credits: Credit[];
}

export default class InMemoryOrderQueue implements IQueueComponent {
  private readonly orders: Order[];

  private static INSTANCE: InMemoryOrderQueue;

  private constructor() {
    this.orders = [];
  }

  // !@ Singleton
  public static getInstance(): InMemoryOrderQueue {
    if (!InMemoryOrderQueue.INSTANCE)
      InMemoryOrderQueue.INSTANCE = new InMemoryOrderQueue();

    return InMemoryOrderQueue.INSTANCE;
  }

  deleteAll(): void {
    while (this.orders.length !== 0) {
      this.orders.pop();
    }
  }

  add(): any {}
  get(): any {}
  remove(): any {}
}
