import Sidebar from "@/components/sidebar/Sidebar";
import { PropsWithChildren } from "react";
import getConversations from "../action/getConversations";
import ConversationList from "./components/ConversationList";

interface Props extends PropsWithChildren {}

const ConversationsLayout: React.FC<Props> = async ({ children }) => {
  return (
    <Sidebar>
      <ConversationList />
      <div className="h-full"> {children} </div>
    </Sidebar>
  );
};

export default ConversationsLayout;
