import {
  describe,
  it,
  expect,
  jest,
  afterEach,
  beforeAll,
} from '@jest/globals';
import User from '../../../../../src/modules/users/model/User';
import InMemoryUsersRepository from '../../../../../src/modules/users/repositories/InMemory/InMemoryUsersRepository';
import crypto from 'crypto';

describe('Repositories - InMemoryUsersRepository', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;

  beforeAll(() => {
    inMemoryUsersRepository = InMemoryUsersRepository.getInstance();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getInstance', () => {
    it('should return the InMemoryUsersRepository on first call', () => {
      expect(inMemoryUsersRepository).toBeInstanceOf(InMemoryUsersRepository);
    });

    it('should return the same InMemoryUsersRepository on another calls', () => {
      const inMemoryUsersRepositorySecondCall =
        InMemoryUsersRepository.getInstance();

      expect(
        Object.is(inMemoryUsersRepository, inMemoryUsersRepositorySecondCall)
      ).toBeTruthy();
    });
  });

  describe('create', () => {
    it('should create a user', () => {
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

  describe('findById', () => {
    it('should find a user by id', () => {
      const user = inMemoryUsersRepository.create({
        name: 'Test',
        email: 'test@test.com',
        password: '1234',
      });

      const userId = user.id;

      const userFound = inMemoryUsersRepository.findById(userId) as User;

      Object.keys(user).forEach((property: string) => {
        expect(user[property as keyof User]).toStrictEqual(
          userFound[property as keyof User]
        );
      });
    });

    it('should return undefined when user does not exist', () => {
      const user = inMemoryUsersRepository.findById('123');

      expect(typeof user).toStrictEqual('undefined');
      expect(user).toBeFalsy();
    });
  });
});
