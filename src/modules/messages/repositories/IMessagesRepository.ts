import ICreateMessageDTO from '../dtos/ICreateMessageDTO';
import IUpdateMessageDTO from '../dtos/IUpdateMessageDTO';
import Message from '../model/Message';

export default interface IMessagesRepository {
  create: (data: ICreateMessageDTO) => Message;
  update: (userId: string, data: IUpdateMessageDTO) => Message;
  findById: (userId: string) => Message | undefined;
  delete: (userId: string) => true;
}
