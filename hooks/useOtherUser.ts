import { FullConversationUsers, FullConversations } from "@/types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (
  conversation:
    | FullConversations
    | { conversationUsers: FullConversationUsers[] }
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    const otherUser = conversation.conversationUsers
      .flatMap((user) => user.user)
      .filter((user) => user.email !== currentUserEmail);

    return otherUser[0];
  }, [session.data?.user?.email, conversation.conversationUsers]);

  return otherUser;
};

export default useOtherUser;
