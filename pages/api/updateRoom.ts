import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ROLE } from "@prisma/client";
import { Room } from "@/app/shared/types/room.type";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const Pusher = require("pusher");

    const { dataRoom }: { dataRoom: Room } = req.body;

    const room = await prisma.room.update({
      where: {
        id: dataRoom.id,
      },
      data: {
        initTime: dataRoom.initTime,
        started: dataRoom.started,
      },
    });

    // Pusher
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: "sa1",
      useTLS: true,
    });

    await pusher.trigger("room-start", "room-start-event", {
      message: `${JSON.stringify({ room })}\n\n`,
    });

    res.status(200).json({ room });
  }
}
