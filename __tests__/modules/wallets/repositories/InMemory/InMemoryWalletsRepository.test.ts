import { describe, it, expect, beforeAll } from '@jest/globals';
import InMemoryWalletsRepository from '../../../../../src/modules/wallets/repositories/InMemory/InMemoryWalletsRepository';

describe('Repositories - InMemoryWalletsRepository', () => {
  let inMemoryWalletsRepository: InMemoryWalletsRepository;

  beforeAll(() => {
    inMemoryWalletsRepository = InMemoryWalletsRepository.getInstance();
  });

  describe('getInstance', () => {
    it('should return the InMemoryWalletsRepository on first call', () => {
      expect(inMemoryWalletsRepository).toBeInstanceOf(
        InMemoryWalletsRepository
      );
    });
  });
});
