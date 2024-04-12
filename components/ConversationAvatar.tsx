"use client";
import useOtherUser from "@/hooks/useOtherUser";
import { FullConversationUsers } from "@/types";
import { Conversation } from "@prisma/client";
import AvatarGroup from "./AvatarGroup";
import Avatar from "./Avatar";

interface Props {
  conversation: Conversation & {
    conversationUsers: FullConversationUsers[];
  };
}

const ConversationAvatar: React.FC<Props> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  return (
    <>
      {conversation.isGroup ? (
        <AvatarGroup
          users={conversation.conversationUsers.flatMap((users) => users.user)}
        />
      ) : (
        <Avatar user={otherUser} />
      )}
    </>
  );
};

export default ConversationAvatar;
