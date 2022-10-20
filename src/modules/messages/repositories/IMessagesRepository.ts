import ICreateMessageDTO from '../dtos/ICreateMessageDTO';
import IUpdateMessageDTO from '../dtos/IUpdateMessageDTO';
import Message from '../model/Message';

export default interface IMessagesRepository {
  create: (data: ICreateMessageDTO) => Message;
  update: (messageId: string, data: IUpdateMessageDTO) => Message;
  findById: (messageId: string) => Message | undefined;
  delete: (messageId: string) => true;
}
