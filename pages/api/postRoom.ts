import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ROLE } from "@prisma/client";

import { Guest } from "@/app/shared/types/guest.type";
import { Room } from "@/app/shared/types/room.type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    const { guest: guestData, room: roomData }: { guest: Guest; room: Room } =
      req.body;

    // Salva no banco com Prisma
    const room = await prisma.room.create({
      data: {
        started: false,
        initTime: "0",
        time: roomData.time,
      },
    });

    const guest = await prisma.guest.create({
      data: {
        username: guestData.username as string,
        role: ROLE.MANEGER,
        score: 0,
        profile: guestData.profile,
        roomId: room.id,
      },
    });

    res.status(200).json({ guest, room });
  }
}
