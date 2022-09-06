import { describe, it, expect } from '@jest/globals';
import InMemoryUsersRepository from '../../../../../src/modules/users/repositories/InMemory/InMemoryUsersRepository';

describe('Repositories - InMemoryUsersRepository', () => {
  describe('getInstance', () => {
    it('should return the InMemoryUsersRepository on first call', () => {
      const inMemoryUsersRepository = InMemoryUsersRepository.getInstance();

      expect(inMemoryUsersRepository).toBeInstanceOf(InMemoryUsersRepository);
    });

    it('should return the same InMemoryUsersRepository on another calls', () => {
      const inMemoryUsersRepositoryFirstCall =
        InMemoryUsersRepository.getInstance();
      const inMemoryUsersRepositorySecondCall =
        InMemoryUsersRepository.getInstance();

      expect(
        Object.is(
          inMemoryUsersRepositoryFirstCall,
          inMemoryUsersRepositorySecondCall
        )
      ).toBeTruthy();
    });
  });
});
