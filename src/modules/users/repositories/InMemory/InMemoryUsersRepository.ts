/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../../dtos/IUpdateUserDTO';
import User from '../../model/User';
import IUsersRepository from '../IUsersRepository';
import { randomUUID } from 'crypto';

export default class InMemoryUsersRepository implements IUsersRepository {
  private readonly users: User[];

  private static INSTANCE: InMemoryUsersRepository;

  private constructor() {
    this.users = [];
  }

  // !@ Singleton
  public static getInstance(): InMemoryUsersRepository {
    if (!InMemoryUsersRepository.INSTANCE)
      InMemoryUsersRepository.INSTANCE = new InMemoryUsersRepository();

    return InMemoryUsersRepository.INSTANCE;
  }

  deleteAll(): void {
    while (this.users.length !== 0) {
      this.users.pop();
    }
  }

  create({ name, email, password }: ICreateUserDTO): User {
    const newUser = new User();

    const date = new Date();

    const data: User = {
      id: randomUUID({
        disableEntropyCache: true,
      }),
      name,
      email,
      password,
      createdAt: date,
      updatedAt: date,
    };

    Object.assign(newUser, data);

    this.users.push(newUser);

    return newUser;
  }

  update(id: string, { name, email, password }: IUpdateUserDTO): User {
    let updated = false;
    const user = this.findById(id);

    if (!user) throw new Error('User not found!');

    if (name) {
      updated = true;
      user.name = name;
    }

    if (email) {
      updated = true;
      user.email = email;
    }

    if (password) {
      updated = true;
      user.password = password;
    }

    if (updated) {
      user.updatedAt = new Date();
      return user;
    }

    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  delete(id: string): true {
    const user = this.findById(id);

    if (!user) throw new Error('User not found!');

    const userIndex = this.users.findIndex((userObj) => userObj.id === user.id);

    this.users.splice(userIndex, 1);

    return true;
  }
}
