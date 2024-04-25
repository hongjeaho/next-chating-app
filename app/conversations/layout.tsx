import Sidebar from "@/components/sidebar/Sidebar";
import { PropsWithChildren } from "react";
import getConversations from "../action/getConversations";
import ConversationList from "./components/ConversationList";
import getUsers from "../action/getrUsers";

interface Props extends PropsWithChildren {}

const ConversationsLayout: React.FC<Props> = async ({ children }) => {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <ConversationList conversations={conversations} users={users} />
      <div className="h-full"> {children} </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
