import { describe, it, expect } from '@jest/globals';
import User from '../../../../src/modules/users/model/User';

describe('Model - User', () => {
  it('should return a default user', () => {
    const user = new User();

    const expectedDefaultUser: User = {
      id: 'no id',
      name: 'no name',
      email: 'no email',
      password: 'no password',
      createdAt: new Date('2000-01-01'),
      updatedAt: new Date('2000-01-01'),
    };

    expect(user.id).toStrictEqual(expectedDefaultUser.id);
    expect(user.name).toStrictEqual(expectedDefaultUser.name);
    expect(user.email).toStrictEqual(expectedDefaultUser.email);
    expect(user.password).toStrictEqual(expectedDefaultUser.password);
    expect(user.createdAt).toStrictEqual(expectedDefaultUser.createdAt);
    expect(user.updatedAt).toStrictEqual(expectedDefaultUser.updatedAt);
  });
});
