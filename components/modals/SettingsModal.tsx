import { User } from "@prisma/client";

interface Props {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<Props> = ({ currentUser, isOpen }) => {
  return <></>;
};

export default SettingsModal;
