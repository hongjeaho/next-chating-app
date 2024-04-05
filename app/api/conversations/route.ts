import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/halper/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const { userId } = body as { userId: string };

  if (!currentUser.id) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const conversation = await prisma.conversation.findMany({
    where: {
      OR: [
        {
          AND: [
            {
              userId: {
                equals: userId,
              },
            },
            {
              conversationUserId: {
                equals: currentUser.id,
              },
            },
          ],
        },
        {
          AND: [
            {
              conversationUserId: {
                equals: userId,
              },
            },
            {
              userId: {
                equals: currentUser.id,
              },
            },
          ],
        },
      ],
    },
  });

  if (conversation.length > 0) {
    return NextResponse.json(conversation[0]);
  }

  const newConversation = await prisma.conversation.create({
    data: {
      conversationUserId: userId,
      isGroup: false,
      user: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  return NextResponse.json(newConversation);
};
