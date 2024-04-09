import getSession from "./getSession";
import prisma from "@/halper/prismadb";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createAt: "desc",
    },
    where: {
      NOT: {
        email: session?.user?.email,
      },
    },
  });

  return users;
};

export default getUsers;
