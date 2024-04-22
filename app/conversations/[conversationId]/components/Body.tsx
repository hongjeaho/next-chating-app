"use client";
import useConversation from "@/hooks/useConversation";
import { FullMessage } from "@/types";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/halper/pusher";
import axios from "axios";
import { find } from "lodash";
import MessageBox from "./MessageBox";
interface Props {
  allMessages: FullMessage[];
}

const Body: React.FC<Props> = ({ allMessages }) => {
  const { conversationId } = useConversation();
  const [messages, setMessages] = useState<FullMessage[]>(allMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!conversationId) {
      return;
    }

    const messageHandler = (message: FullMessage) => {
      bottomRef?.current?.scrollIntoView();
      axios.post(`api/conversations/${conversationId}/seen`);

      setMessages((currentMessage) => {
        if (find(currentMessage, { id: message.id })) {
          return currentMessage;
        }

        return [...currentMessage, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    pusherClient.subscribe(conversationId);
    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <MessageBox
          key={message.id}
          message={message}
          isLast={index === messages.length - 1}
        />
      ))}
      <div className="pt-24" ref={bottomRef}></div>
    </div>
  );
};

export default Body;
