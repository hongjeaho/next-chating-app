"use client";
import { FullMessage } from "@/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface Props {
  isLast: boolean;
  message: FullMessage;
}

const MessageBox: React.FC<Props> = ({ isLast, message }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session.data?.user?.id === message?.createId;

  return (
    <div className={clsx("flex gap-3 p-4", isOwn && "justify-end")}>
      {message.body}
    </div>
  );
};

export default MessageBox;
