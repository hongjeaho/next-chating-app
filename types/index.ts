import {
  Conversation,
  ConversationUsers,
  Message,
  Observed,
  User,
} from "@prisma/client";

export interface ResponseError {
  message: string;
  response: {
    status: number;
    statusText: string;
    data: {
      message: string;
    };
  };
}

export type FullObserved = Observed & {
  user: User;
};
export type FullMessage = Message & {
  observed: FullObserved[];
};

export type FullConversationUsers = ConversationUsers & {
  user: User;
};
export type FullConversations = Conversation & {
  messages: FullMessage[];
  conversationUsers: FullConversationUsers[];
};
