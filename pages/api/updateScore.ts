import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ROLE } from "@prisma/client";
import { Guest } from "@/app/shared/types/guest.type";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const Pusher = require("pusher");

    const { dataUser }: { dataUser: Guest } = req.body;

    const guest = await prisma.guest.update({
      where: {
        id: dataUser.id,
      },
      data: {
        score: dataUser.score,
      },
    });

    const guests = await prisma.guest.findMany({
      where: {
        roomId: dataUser.roomId,
      },
    });

    const dbRoomID = dataUser.roomId;

    // Pusher
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: "sa1",
      useTLS: true,
    });

    pusher.trigger("score", "score-event", {
      message: `${JSON.stringify({ guests, guest, dbRoomID })}\n\n`,
    });

    res.status(200).json({ guests, guest });
  }
}
