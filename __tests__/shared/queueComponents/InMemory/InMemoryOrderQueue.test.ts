import { describe, it, expect, beforeAll, afterEach } from '@jest/globals';

import InMemoryOrderQueue from '../../../../src/shared/queueComponents/InMemory/InMemoryOrderQueue';
import OrderDataMother from './OrderDataMother';

describe('Queue Components - InMemoryOrderQueue', () => {
  let inMemoryOrderQueue: InMemoryOrderQueue;

  beforeAll(() => {
    inMemoryOrderQueue = InMemoryOrderQueue.getInstance();
  });

  afterEach(() => {
    inMemoryOrderQueue.deleteAll();
  });

  describe('getInstance', () => {
    it('should return the InMemoryOrderQueue on first call', () => {
      expect(inMemoryOrderQueue).toBeInstanceOf(InMemoryOrderQueue);
    });

    it('should return the same InMemoryOrderQueue on another calls', () => {
      const inMemoryOrderQueueSecondCall = InMemoryOrderQueue.getInstance();

      expect(inMemoryOrderQueueSecondCall).toBe(inMemoryOrderQueue);
    });
  });

  describe('add', () => {
    it('should add an order to queue', () => {
      const orderData = OrderDataMother.valid();

      const result = inMemoryOrderQueue.add(orderData);

      expect(result).toBeTruthy();
    });
  });

  describe('get', () => {
    it('should get an order from queue', () => {
      const orderData = OrderDataMother.valid();

      inMemoryOrderQueue.add(orderData);

      const order = inMemoryOrderQueue.get();

      expect(order).toEqual(orderData);
    });

    it('should get the next order from queue', () => {
      const orderData = OrderDataMother.valid();
      const orderData2 = OrderDataMother.validWithPaymentTypePix();

      inMemoryOrderQueue.add(orderData);
      inMemoryOrderQueue.add(orderData2);

      const order = inMemoryOrderQueue.get();
      const order2 = inMemoryOrderQueue.get();

      expect(order).toEqual(orderData);
      expect(order2).toEqual(orderData2);
    });

    it('should return false when the queue is empty', () => {
      const order = inMemoryOrderQueue.get();

      expect(order).toBeFalsy();
    });
  });
});
