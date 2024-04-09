import { User } from "@prisma/client";

interface Props {
  users: User[];
  isOpen: boolean;
  onClose: () => void;
}

const GroupChatModal: React.FC<Props> = () => {
  return <></>;
};

export default GroupChatModal;
