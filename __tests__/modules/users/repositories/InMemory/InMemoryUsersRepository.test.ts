import { describe, it, expect, jest, afterEach } from '@jest/globals';
import User from '../../../../../src/modules/users/model/User';
import InMemoryUsersRepository from '../../../../../src/modules/users/repositories/InMemory/InMemoryUsersRepository';
import crypto from 'crypto';

describe('Repositories - InMemoryUsersRepository', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

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

  describe('create', () => {
    it('should create a user', () => {
      const inMemoryUsersRepository = InMemoryUsersRepository.getInstance();
      const dateNow = new Date('2022-01-01');
      jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce('1234');
      jest.useFakeTimers({
        now: dateNow,
      });

      const expectedUser: User = {
        id: '1234',
        name: 'Test',
        email: 'test@test.com',
        password: '12345',
        createdAt: dateNow,
        updatedAt: dateNow,
      };

      const user = inMemoryUsersRepository.create({
        name: 'Test',
        email: 'test@test.com',
        password: '12345',
      });

      expect(user).toBeInstanceOf(User);

      Object.keys(user).forEach((property: string) => {
        expect(user[property as keyof User]).toStrictEqual(
          expectedUser[property as keyof User]
        );
      });
    });
  });
});
