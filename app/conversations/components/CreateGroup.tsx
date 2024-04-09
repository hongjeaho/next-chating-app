"use client";
import GroupChatModal from "@/components/modals/GroupChatModal";
import { User } from "@prisma/client";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";

interface Props {
  users: User[];
}

const CreateGroup: React.FC<Props> = ({ users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="text-2xl font-bold text-neutral-800">채팅 앱</div>
      <div
        onClick={() => setIsModalOpen(true)}
        className="p-2 text-gray-600 transition bg-gray-100 rounded-full cursor-pointer hover:opacity-75"
      >
        <MdOutlineGroupAdd size={20} />
      </div>
    </>
  );
};

export default CreateGroup;
