export default interface ICreateMessageDTO {
  userId: String;
  contactId: String;
  content: String;
  type: 'email' | 'sms' | 'whatsapp';
  status: 'received' | 'sent';
}
