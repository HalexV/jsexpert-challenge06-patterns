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
  let updateDateMock: Date;

  beforeAll(() => {
    inMemoryUsersRepository = InMemoryUsersRepository.getInstance();
    updateDateMock = new Date('2022-01-01');
  });

  afterEach(() => {
    jest.useRealTimers();
    inMemoryUsersRepository.deleteAll();
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
      const nonexistentId = '987';
      const user = inMemoryUsersRepository.findById(nonexistentId);

      expect(typeof user).toStrictEqual('undefined');
      expect(user).toBeFalsy();
    });
  });

  describe('update', () => {
    it('should update a user by id', () => {
      const userData = UserDataMother.valid();
      const userDataUpdated = UserDataMother.withUpdatedData();
      const user = inMemoryUsersRepository.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      jest.useFakeTimers({
        now: updateDateMock,
      });

      const updateData = {
        name: userDataUpdated.name,
        email: userDataUpdated.email,
        password: userDataUpdated.password,
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
      const userDataUpdated = UserDataMother.withUpdatedData();
      const updateData = {
        name: userDataUpdated.name,
        email: userDataUpdated.email,
        password: userDataUpdated.password,
      };

      const userId = 'invalid';

      expect(() => inMemoryUsersRepository.update(userId, updateData)).toThrow(
        'User not found!'
      );
    });

    it('should just return the user when update data is empty', () => {
      const userData = UserDataMother.valid();
      const updateData = {};

      const user = inMemoryUsersRepository.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
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
      const userData = UserDataMother.valid();
      const user = inMemoryUsersRepository.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      const deleteResult = inMemoryUsersRepository.delete(user.id);

      const findResult = inMemoryUsersRepository.findById(user.id);

      expect(deleteResult).toBeTruthy();
      expect(typeof findResult).toStrictEqual('undefined');
    });
  });

  describe('deleteAll', () => {
    it('should delete all data', () => {
      const userData = UserDataMother.valid();

      const user1 = inMemoryUsersRepository.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      const user2 = inMemoryUsersRepository.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      inMemoryUsersRepository.deleteAll();

      const userNotFound1 = inMemoryUsersRepository.findById(user1.id);
      const userNotFound2 = inMemoryUsersRepository.findById(user2.id);

      expect(userNotFound1).toBeFalsy();
      expect(userNotFound2).toBeFalsy();
    });
  });
});
