import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

const ConversationsLayout: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default ConversationsLayout;
