import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ROLE } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  "use server";

  const guests = await prisma.guest.findMany();

  return res.status(200).json({ guests });
}
