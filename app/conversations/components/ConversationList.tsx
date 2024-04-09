import clsx from "clsx";
import CreateGroup from "./CreateGroup";
import ConversationBox from "./ConversationBox";
import getConversations from "@/app/action/getConversations";
import getUsers from "@/app/action/getrUsers";

interface Props {}

const ConversationList: React.FC<Props> = async () => {
  const conversations = await getConversations();
  const users = await getUsers();

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
        {conversations.map((conversation) => (
          <ConversationBox key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
