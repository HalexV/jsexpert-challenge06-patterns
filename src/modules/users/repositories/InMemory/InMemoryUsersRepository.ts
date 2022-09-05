/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../../dtos/IUpdateUserDTO';
import User from '../../model/User';
import IUsersRepository from '../IUsersRepository';

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

  create({ name, email, password }: ICreateUserDTO): User {
    throw new Error('Not implemented yet');
  }

  update(id: string, { name, email, password }: IUpdateUserDTO): User {
    throw new Error('Not implemented yet');
  }

  findById(id: string): User | undefined {
    throw new Error('Not implemented yet');
  }

  delete(id: string): true {
    throw new Error('Not implemented yet');
  }
}
