"use client";
import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/AvatarGroup";
import useOtherUser from "@/hooks/useOtherUser";
import { FullConversationUsers } from "@/types";
import { Conversation } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import useActive from "@/hooks/useActive";
import ConversationAvatar from "@/components/ConversationAvatar";

interface Props {
  conversation: Conversation & {
    conversationUsers: FullConversationUsers[];
  };
}

const Header: React.FC<Props> = ({ conversation }) => {
  const [isOPen, setOpen] = useState(false);
  const otherUser = useOtherUser(conversation);
  const { isActive, statusText } = useActive(conversation);

  return (
    <>
      <ProfileDrawer
        conversation={conversation}
        isOpen={isOPen}
        onClose={() => {
          setOpen(false);
        }}
      />
      <div
        className="
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      "
      >
        <div className="flex items-center gap-3">
          <Link
            href={"/conversations"}
            className="block text-orange-500 transition cursor-pointer lg:hidden hover:text-orange-600"
          >
            <HiChevronLeft size={32} />
          </Link>
          <ConversationAvatar conversation={conversation} />
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          className="text-orange-500 transition cursor-pointer hover:text-orange-600"
          onClick={() => {
            setOpen(true);
          }}
        />
      </div>
    </>
  );
};

export default Header;
