"use client";
import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/AvatarGroup";
import useConversation from "@/hooks/useConversation";
import { FullConversations, FullMessage } from "@/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import useLastMessage from "@/hooks/useLastMessage";
interface Props {
  conversation: FullConversations;
}

const ConversationBox: React.FC<Props> = ({ conversation }) => {
  const session = useSession();
  const router = useRouter();
  const { conversationId } = useConversation();
  const { lastMessage, hasObserved, lastMessageText } = useLastMessage(
    conversation.messages
  );

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  const selected = useMemo(() => {
    return conversation.id === conversationId;
  }, [conversation.id, conversationId]);

  const otherUser = useMemo(() => {
    const otherUsers = conversation.conversationUsers.filter(
      (conversationUser) =>
        conversationUser.user.email !== session.data?.user?.email
    );
    return otherUsers[0].user;
  }, [conversation.conversationUsers, session.data?.user?.email]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        mb-3
        `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {conversation.isGroup ? (
        <AvatarGroup
          users={conversation.conversationUsers.flatMap(
            (conversationUser) => conversationUser.user
          )}
        />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="flex-1 min-w-0">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex items-center justify-between mb-1">
            <p className="font-medium text-gray-900 text-md">
              {conversation.name || otherUser.name}
            </p>
            {lastMessage?.createAt && (
              <p className="text-xs font-light text-gray-400 ">
                {format(new Date(lastMessage.createAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `
              truncate 
              text-sm
              `,
              hasObserved ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
