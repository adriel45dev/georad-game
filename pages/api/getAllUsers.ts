import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ROLE } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  try {
    const guests = await prisma.guest.findMany();

    // resto do código

    res.status(200).json(guests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching guests" });
  } finally {
    await prisma.$disconnect();
  }
}
