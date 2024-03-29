import bcrypt from "bcrypt";
import prisma from "@/halper/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();

  const { name, email, password } = body;

  const usedEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (usedEmail) {
    return NextResponse.json(
      { message: "이미 사용하고 있는 이메일 입니다." },
      { status: 409 }
    );
  }

  const hashPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashPassword,
    },
  });

  return NextResponse.json(user);
};
