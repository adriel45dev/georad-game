import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ROLE } from "@prisma/client";
import { Guest } from "@/app/shared/types/guest.type";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user, roomID }: { user: Guest; roomID: number } = req.body;

    const room = await prisma.room.findUnique({
      where: {
        id: roomID,
      },
    });

    if (!room) return res.status(404).json({ error: "Sala não existe" });

    const updateGuest = await prisma.guest.update({
      where: {
        id: user.id,
      },
      data: {
        profile: user.profile,
        score: user.score,
        roomId: room.id,
        role: ROLE.PLAYER,
      },
    });

    res.status(200).json({ updateGuest, room });
  }
}
