import {
  describe,
  it,
  expect,
  beforeAll,
  jest,
  afterEach,
} from '@jest/globals';
import crypto from 'node:crypto';
import Message from '../../../../../src/modules/messages/model/Message';
import InMemoryMessagesRepository from '../../../../../src/modules/messages/repositories/InMemory/InMemoryMessagesRepository';
import MessageDataMother from './MessageDataMother';

describe('Repositories - InMemoryMessagesRepository', () => {
  let inMemoryMessagesRepository: InMemoryMessagesRepository;

  beforeAll(() => {
    inMemoryMessagesRepository = InMemoryMessagesRepository.getInstance();
  });

  afterEach(() => {
    jest.useRealTimers();
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

  describe('create', () => {
    it('should create a message', () => {
      const messageData = MessageDataMother.valid();

      jest.spyOn(crypto, 'randomUUID').mockReturnValueOnce(messageData.id);
      jest.useFakeTimers({
        now: messageData.createdAt,
      });

      const expectedMessage = messageData;

      const message = inMemoryMessagesRepository.create({
        userId: messageData.userId,
        contactId: messageData.contactId,
        content: messageData.content,
        status: messageData.status,
        type: messageData.type,
      });

      expect(message).toBeInstanceOf(Message);
      expect(message).toEqual(expectedMessage);
    });
  });
});
