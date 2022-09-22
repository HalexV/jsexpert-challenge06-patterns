import { describe, it, expect } from '@jest/globals';
import Message from '../../../../src/modules/messages/model/Message';

describe('Model - Message', () => {
  it('should return a default message', () => {
    const message = new Message();
    const defaultDate = new Date('2000-01-01');

    const expectedDefaultMessage: Message = {
      id: 'no id',
      userId: 'no userId',
      contactId: 'no contactId',
      content: '',
      type: 'email',
      status: 'received',
      createdAt: defaultDate,
      updatedAt: defaultDate,
    };

    expect(message).toEqual(expectedDefaultMessage);
  });
});
