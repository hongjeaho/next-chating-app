"use client";
import Avatar from "@/components/Avatar";
import LoadingModal from "@/components/modals/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  user: User;
}

const UserBox: React.FC<Props> = ({ user }) => {
  const route = useRouter();
  const [isLoading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    axios
      .post("/api/conversations", { userId: user.id })
      .then((response) => {
        route.push(`/conversations/${response.data.id}`);
      })
      .catch(() => toast.error("대화방을 찾을 수 없습니다."))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <Avatar user={user} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
