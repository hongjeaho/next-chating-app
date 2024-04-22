import getConversationById from "@/app/action/getConversationById";
import getMessages from "@/app/action/getMessages";
import EmptyState from "@/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface Params {
  conversationId: string;
}
interface Props {
  params: Params;
}

const ConversationDetail: React.FC<Props> = async ({ params }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        {!conversation ? (
          <EmptyState />
        ) : (
          <>
            <Header conversation={conversation} />
            <Body allMessages={messages} />
            <Form />
          </>
        )}
      </div>
    </div>
  );
};

export default ConversationDetail;
