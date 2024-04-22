import getCurrentUser from "@/app/action/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/halper/prismadb";
import { pusherServer } from "@/halper/pusher";

export const POST = async (request: Request) => {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const { message, image, conversationId } = body;

  if (!currentUser?.id || !currentUser.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  console.debug("######[prisma.message.create]######");
  // 새로운 메세지..
  const newMessage = await prisma.message.create({
    data: {
      body: message,
      image: image,
      conversation: {
        connect: {
          id: conversationId,
        },
      },
      user: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  console.debug("######[prisma.observed.create]######");
  // 메세지를 본 사람
  await prisma.observed.create({
    data: {
      user: {
        connect: {
          id: currentUser.id,
        },
      },
      message: {
        connect: {
          id: newMessage.id,
        },
      },
    },
  });

  console.debug("######[prisma.conversation.update]######");
  // 마지막 메세지 시가 및 마지막 메세지 id update
  const conversation = await prisma.conversation.update({
    where: {
      id: conversationId,
    },
    data: {
      lastMessageAt: new Date(),
      messages: {
        connect: {
          id: newMessage.id,
        },
      },
    },
    include: {
      conversationUsers: {
        include: {
          user: true,
        },
      },
      messages: {
        include: {
          observed: true,
        },
      },
    },
  });

  const lastMessage = conversation.messages.length - 1;

  await pusherServer.trigger(conversationId, "messages:new", lastMessage);
  conversation.conversationUsers
    .flatMap((item) => item.user)
    .forEach((user) => {
      pusherServer.trigger(user.email, "conversation:update", {
        id: conversationId,
        message: lastMessage,
      });
    });

  return NextResponse.json(lastMessage);
};
