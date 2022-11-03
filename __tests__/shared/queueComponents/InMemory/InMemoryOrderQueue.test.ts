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
});
