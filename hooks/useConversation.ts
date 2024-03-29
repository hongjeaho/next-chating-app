import { useParams } from "next/navigation";

interface Params {
  conversationId: string | undefined;
}

const useConversation = () => {
  const params = useParams() as Readonly<Params>;
  const conversationId = params.conversationId;
  return {
    conversationId,
    isOpen: !!conversationId,
  };
};

export default useConversation;
