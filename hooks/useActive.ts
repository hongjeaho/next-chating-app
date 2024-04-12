import { useMemo } from "react";
import useActiveList from "./useActiveList";
import useOtherUser from "./useOtherUser";
import { Conversation } from "@prisma/client";
import { FullConversationUsers } from "@/types";

type activeType = Conversation & {
  conversationUsers: FullConversationUsers[];
};

const useActive = (conversation: activeType) => {
  const otherUser = useOtherUser(conversation);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser.email) !== -1;
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.conversationUsers.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation.isGroup, conversation.conversationUsers.length, isActive]);

  return {
    isActive,
    statusText,
  };
};

export default useActive;
