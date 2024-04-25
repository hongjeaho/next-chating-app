"use client";
import clsx from "clsx";
import CreateGroup from "./CreateGroup";
import ConversationBox from "./ConversationBox";
import getUsers from "@/app/action/getrUsers";
import { useEffect, useState } from "react";
import { FullConversations, FullMessage } from "@/types";
import { pusherClient } from "@/halper/pusher";
import getCurrentUser from "@/app/action/getCurrentUser";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
interface Props {
  conversations: FullConversations[];
  users: User[];
}

const ConversationList: React.FC<Props> = ({ conversations, users }) => {
  const [items, setItems] = useState(conversations);
  const session = useSession();
  const userId = session.data?.user.id;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const updateConversation = (obj: { id: string; message: FullMessage }) => {
      setItems((conversations) => {
        conversations.forEach((it) => {
          if (it.id === obj.id) {
            it.messages.push(obj.message);
          }
        });
        return conversations;
      });
    };

    pusherClient.subscribe(userId);
    pusherClient.bind("conversation:update", updateConversation);

    return () => {
      pusherClient.unsubscribe(userId);
      pusherClient.unbind("conversation:update", updateConversation);
    };
  }, [conversations.length, userId]);

  return (
    <aside
      className={clsx(`
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
      `)}
    >
      <div className="px-5">
        <div className="flex justify-between pt-4 mb-4">
          <CreateGroup users={users} />
        </div>
        {items.map((conversation) => (
          <ConversationBox key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
