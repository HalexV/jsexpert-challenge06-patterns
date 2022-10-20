import { describe, it, expect, beforeAll } from '@jest/globals';
import InMemoryMessagesRepository from '../../../../../src/modules/messages/repositories/InMemory/InMemoryMessagesRepository';

describe('Repositories - InMemoryMessagesRepository', () => {
  let inMemoryMessagesRepository: InMemoryMessagesRepository;

  beforeAll(() => {
    inMemoryMessagesRepository = InMemoryMessagesRepository.getInstance();
  });

  describe('getInstance', () => {
    it('should return the InMemoryMessagesRepository on first call', () => {
      expect(inMemoryMessagesRepository).toBeInstanceOf(
        InMemoryMessagesRepository
      );
    });

    it('should return the same InMemoryMessagesRepository on another calls', () => {
      const inMemoryMessagesRepositorySecondCall =
        InMemoryMessagesRepository.getInstance();

      expect(inMemoryMessagesRepositorySecondCall).toBe(
        inMemoryMessagesRepository
      );
    });
  });
});
