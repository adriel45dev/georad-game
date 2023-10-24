import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ROLE } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  "use server";

  const prisma = new PrismaClient();

  const guests = await prisma.guest.findMany();

  return res.status(200).json({ guests });
}
