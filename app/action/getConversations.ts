import getCurrentUser from "./getCurrentUser";
import prisma from "@/halper/prismadb";
import users from "./getrUsers";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  const conversations = await prisma.conversation.findMany({
    where: {
      conversationUsers: {
        some: {
          userId: currentUser.id,
        },
      },
    },
    orderBy: {
      createAt: "desc",
    },
    include: {
      conversationUsers: {
        include: {
          user: true,
        },
      },
      messages: {
        orderBy: {
          createAt: "asc",
        },
        include: {
          user: true,
          observed: {
            include: {
              user: true,
            },
          },
        },
      },
    },
    distinct: ["id"],
  });

  return conversations;
};

export default getConversations;
