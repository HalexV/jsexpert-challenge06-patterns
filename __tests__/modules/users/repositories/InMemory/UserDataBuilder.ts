interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export default class UserDataBuilder {
  private readonly userData;

  private constructor() {
    const dateNow = new Date('2022-01-01');

    this.userData = {
      id: '1234',
      name: 'Test',
      email: 'test@test.com',
      password: '12345',
      createdAt: dateNow,
      updatedAt: dateNow,
    };
  }

  static aUserData(): UserDataBuilder {
    return new UserDataBuilder();
  }

  build(): UserData {
    return this.userData;
  }
}

export { UserData };
