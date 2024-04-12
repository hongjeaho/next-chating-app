import prisma from "@/halper/prismadb";
import { getSession } from "next-auth/react";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId: string) => {
  const user = await getCurrentUser();

  if (!user?.email) {
    return null;
  }

  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      conversationUsers: {
        include: {
          user: true,
        },
      },
    },
  });

  return conversation;
};

export default getConversationById;
