import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/halper/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const { userId } = body as { userId: string };

  if (!currentUser?.id) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const conversation = await prisma.conversation.findMany({
    include: {
      conversationUsers: {
        where: {
          OR: [{ id: userId }, { id: currentUser.id }],
        },
      },
    },
  });

  if (conversation.length > 0) {
    return NextResponse.json(conversation[0]);
  }

  const newConversation = await prisma.conversation.create({
    data: {
      isGroup: false,
      conversationUsers: {
        create: [
          { userId: currentUser.id, isOnwer: true },
          { userId: userId, isOnwer: false },
        ],
      },
    },
    include: {
      conversationUsers: true,
    },
  });

  return NextResponse.json(newConversation);
};
