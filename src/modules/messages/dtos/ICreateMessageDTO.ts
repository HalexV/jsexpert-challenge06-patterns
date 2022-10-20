export default interface ICreateMessageDTO {
  userId: string;
  contactId: string;
  content: string;
  type: 'email' | 'sms' | 'whatsapp';
  status: 'received' | 'sent';
}
