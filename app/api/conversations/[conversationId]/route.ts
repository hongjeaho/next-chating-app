import getCurrentUser from "@/app/action/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/halper/prismadb";
import { pusherServer } from "@/halper/pusher";

interface IParams {
  conversationId?: string;
}

export const DELETE = async (
  request: Request,
  { params }: { params: IParams }
) => {
  const { conversationId } = params;
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return NextResponse.json(null);
  }

  const existingConversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      conversationUsers: true,
    },
  });

  if (!existingConversation) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const deletedConversation = await prisma.conversation.delete({
    where: {
      id: conversationId,
      conversationUsers: {
        some: {
          userId: currentUser.id,
        },
      },
    },
  });

  // existingConversation.conversationUsers.forEach((user) => {
  //   if (user.userId) {
  //     pusherServer.trigger(
  //       user.userId,
  //       "conversation:remove",
  //       existingConversation
  //     );
  //   }
  // });

  return NextResponse.json(deletedConversation);
};
