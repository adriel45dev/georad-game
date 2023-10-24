import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ROLE } from "@prisma/client";

import { Guest } from "@/app/shared/types/guest.type";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Guest[] | { error: string }>
) {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  console.log(process.env.NEXT_PUBLIC_PUSHER_KEY);

  try {
    const guests = await prisma.guest.findMany();

    res.status(200).json(guests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching guests" });
  } finally {
    await prisma.$disconnect();
  }
}
