import { FullMessage } from "@/types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useLastMessage = (messages: FullMessage[]) => {
  const session = useSession();

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  const lastMessage = useMemo(() => {
    return messages[messages.length - 1];
  }, [messages]);

  const hasObserved = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const observedArray = lastMessage.observed || [];

    if (!userEmail) {
      return false;
    }

    return (
      observedArray.filter((user) => user.user.email === userEmail).length !== 0
    );
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "대화를 시작했습니다.";
  }, [lastMessage]);

  return {
    lastMessage,
    hasObserved,
    lastMessageText,
  };
};

export default useLastMessage;
