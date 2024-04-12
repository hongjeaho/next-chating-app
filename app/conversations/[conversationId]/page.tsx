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
    <div className="h-full lg:pl-80">
      <div className="flex flex-col h-full">
        {!conversation ? (
          <EmptyState />
        ) : (
          <>
            <Header conversation={conversation} />
            <Body messages={messages} />
            <Form />
          </>
        )}
      </div>
    </div>
  );
};

export default ConversationDetail;
