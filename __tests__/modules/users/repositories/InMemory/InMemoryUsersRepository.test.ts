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
import UserDataMother from './UserDataMother';

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

      expect(inMemoryUsersRepositorySecondCall).toBe(inMemoryUsersRepository);
    });
  });

  describe('create', () => {
    it('should create a user', () => {
      const userData = UserDataMother.valid();

      jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce(userData.id);
      jest.useFakeTimers({
        now: userData.createdAt,
      });

      const expectedUser = userData;

      const user = inMemoryUsersRepository.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      expect(user).toBeInstanceOf(User);
      expect(user).toEqual(expectedUser);
    });
  });

  describe('findById', () => {
    it('should find a user by id', () => {
      const userData = UserDataMother.valid();
      const user = inMemoryUsersRepository.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      const userId = user.id;

      const userFound = inMemoryUsersRepository.findById(userId) as User;

      expect(userFound).toEqual(user);
    });

    it('should return undefined when user does not exist', () => {
      const user = inMemoryUsersRepository.findById('123');

      expect(typeof user).toStrictEqual('undefined');
      expect(user).toBeFalsy();
    });
  });

  describe('update', () => {
    it('should update a user by id', () => {
      const updateDateMock = new Date('2022-01-01');
      const user = inMemoryUsersRepository.create({
        name: 'Test',
        email: 'test@test.email',
        password: '1234',
      });

      jest.useFakeTimers({
        now: updateDateMock,
      });

      const updateData = {
        name: 'Test test',
        email: 'test1@test.com',
        password: '4321',
      };

      const expectedUser: User = {
        id: user.id,
        name: updateData.name,
        email: updateData.email,
        password: updateData.password,
        createdAt: user.createdAt,
        updatedAt: updateDateMock,
      };

      const updatedUser = inMemoryUsersRepository.update(user.id, updateData);

      expect(updatedUser).toEqual(expectedUser);
    });

    it('should throw an error when user does not exist', () => {
      const updateData = {
        name: 'Test test',
        email: 'test1@test.com',
        password: '4321',
      };

      const userId = 'invalid';

      expect(() => inMemoryUsersRepository.update(userId, updateData)).toThrow(
        'User not found!'
      );
    });

    it('should just return the user when update data is empty', () => {
      const updateData = {};

      const updateDateMock = new Date('2022-01-01');
      const user = inMemoryUsersRepository.create({
        name: 'Test',
        email: 'test@test.email',
        password: '1234',
      });

      jest.useFakeTimers({
        now: updateDateMock,
      });

      const notUpdatedUser = inMemoryUsersRepository.update(
        user.id,
        updateData
      );

      expect(notUpdatedUser).toEqual(user);
    });
  });

  describe('delete', () => {
    it('should throw an error when user does not exist', () => {
      const userId = 'invalid';
      expect(() => inMemoryUsersRepository.delete(userId)).toThrow(
        'User not found!'
      );
    });

    it('should delete a user', () => {
      const user = inMemoryUsersRepository.create({
        name: 'Test',
        email: 'test@test.com',
        password: '1234',
      });

      const deleteResult = inMemoryUsersRepository.delete(user.id);

      const findResult = inMemoryUsersRepository.findById(user.id);

      expect(deleteResult).toBeTruthy();
      expect(typeof findResult).toStrictEqual('undefined');
    });
  });
});
