import { FullMessage } from "@/types";

interface Props {
  isLast: boolean;
  message: FullMessage;
}

const MessageBox: React.FC<Props> = ({ isLast, message }) => {
  return <div>{message.body}</div>;
};

export default MessageBox;
