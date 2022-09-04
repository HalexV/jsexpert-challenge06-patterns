export default class User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = 'no id';
    this.name = 'no name';
    this.email = 'no email';
    this.password = 'no password';
    this.createdAt = new Date('2000-01-01');
    this.updatedAt = this.createdAt;
  }
}
