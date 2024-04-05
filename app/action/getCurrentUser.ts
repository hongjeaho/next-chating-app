import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/halper/prismadb";

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      throw new Error("사용자 세션이없습니다.");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      throw new Error("사용자 정보가 없습니다.");
    }

    return user;
  } catch {
    throw new Error("사용자 세션 조회중 에러가 발생 하였습니다.");
  }
};

export default getCurrentUser;
