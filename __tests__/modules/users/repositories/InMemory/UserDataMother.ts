/* eslint-disable @typescript-eslint/no-extraneous-class */
import UserDataBuilder, { UserData } from './UserDataBuilder';

export default class UserDataMother {
  static valid(): UserData {
    return UserDataBuilder.aUserData().build();
  }
}
