/* eslint-disable @typescript-eslint/no-extraneous-class */

import MessageDataBuilder, { MessageData } from './MessageDataBuilder';

export default class MessageDataMother {
  static valid(): MessageData {
    return MessageDataBuilder.aMessageData().build();
  }

  static withUpdatedContent(): MessageData {
    return MessageDataBuilder.aMessageData().withUpdatedContent().build();
  }
}
