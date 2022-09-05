import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import User from '../model/User';

export default interface IUsersRepository {
  create: ({ name, email, password }: ICreateUserDTO) => User;
  update: (id: string, { name, email, password }: IUpdateUserDTO) => User;
  findById: (id: string) => User | undefined;
  delete: (id: string) => true;
}
