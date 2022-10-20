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
  let updateDateMock: Date;

  beforeAll(() => {
    inMemoryMessagesRepository = InMemoryMessagesRepository.getInstance();
    updateDateMock = new Date('2022-01-02');
  });

  afterEach(() => {
    jest.useRealTimers();
    inMemoryMessagesRepository.deleteAll();
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

  describe('findById', () => {
    it('should find a message by id', () => {
      const messageData = MessageDataMother.valid();
      const message = inMemoryMessagesRepository.create({
        userId: messageData.userId,
        contactId: messageData.contactId,
        content: messageData.content,
        status: messageData.status,
        type: messageData.type,
      });

      const messageId = message.id;

      const messageFound = inMemoryMessagesRepository.findById(
        messageId
      ) as Message;

      expect(messageFound).toEqual(message);
    });

    it('should return undefined when message does not exist', () => {
      const nonexistentId = '987';
      const message = inMemoryMessagesRepository.findById(nonexistentId);

      expect(typeof message).toStrictEqual('undefined');
      expect(message).toBeFalsy();
    });
  });

  describe('update', () => {
    it('should throw an error when message does not exist', () => {
      const messageDataUpdated = MessageDataMother.withUpdatedContent();
      const updateData = {
        content: messageDataUpdated.content,
      };

      const messageId = 'invalid';

      expect(() =>
        inMemoryMessagesRepository.update(messageId, updateData)
      ).toThrow('Message not found!');
    });

    it('should update a message by id', () => {
      const messageData = MessageDataMother.valid();
      const messageDataUpdated = MessageDataMother.withUpdatedContent();
      const message = inMemoryMessagesRepository.create({
        userId: messageData.userId,
        contactId: messageData.contactId,
        content: messageData.content,
        status: messageData.status,
        type: messageData.type,
      });

      jest.useFakeTimers({
        now: updateDateMock,
      });

      const updateData = {
        content: messageDataUpdated.content,
      };

      const expectedMessage = Object.assign({}, message, {
        content: updateData.content,
        updatedAt: updateDateMock,
      });

      const updatedMessage = inMemoryMessagesRepository.update(
        message.id,
        updateData
      );

      expect(updatedMessage).toEqual(expectedMessage);
    });
  });

  describe('delete', () => {
    it('should throw an error when message does not exist', () => {
      const messageId = 'invalid';
      expect(() => inMemoryMessagesRepository.delete(messageId)).toThrow(
        'Message not found!'
      );
    });

    it('should delete a message', () => {
      const messageData = MessageDataMother.valid();
      const message = inMemoryMessagesRepository.create({
        userId: messageData.userId,
        contactId: messageData.contactId,
        content: messageData.content,
        status: messageData.status,
        type: messageData.type,
      });

      const deleteResult = inMemoryMessagesRepository.delete(message.id);

      const findResult = inMemoryMessagesRepository.findById(message.id);

      expect(deleteResult).toBeTruthy();
      expect(typeof findResult).toStrictEqual('undefined');
    });
  });

  describe('deleteAll', () => {
    it('should delete all data', () => {
      const messageData = MessageDataMother.valid();
      const message1 = inMemoryMessagesRepository.create({
        userId: messageData.userId,
        contactId: messageData.contactId,
        content: messageData.content,
        status: messageData.status,
        type: messageData.type,
      });

      const message2 = inMemoryMessagesRepository.create({
        userId: messageData.userId,
        contactId: messageData.contactId,
        content: messageData.content,
        status: messageData.status,
        type: messageData.type,
      });

      inMemoryMessagesRepository.deleteAll();

      const messageNotFound1 = inMemoryMessagesRepository.findById(
        message1.userId
      );
      const messageNotFound2 = inMemoryMessagesRepository.findById(
        message2.userId
      );

      expect(messageNotFound1).toBeFalsy();
      expect(messageNotFound2).toBeFalsy();
    });
  });
});
