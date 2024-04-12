import prisma from "@/halper/prismadb";

const getMessages = async (conversationId: string) => {
  const messages = await prisma.message.findMany({
    where: {
      id: conversationId,
    },
    include: {
      user: true,
      observed: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createAt: "asc",
    },
  });

  return messages;
};

export default getMessages;
