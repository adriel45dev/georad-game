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

    // Salva no banco com Prisma
    const guest = await prisma.guest.create({
      data: {
        username: user.username as string,
        role: ROLE.PLAYER,
        score: 0,
        profile: user.profile,
        roomId: room.id, //
      },
    });

    res.status(200).json({ guest, room });
  }
}
