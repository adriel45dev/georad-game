import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ROLE } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  "use server";

  const { id } = req.query;
  const Pusher = require("pusher");

  if (req.method === "GET") {
    try {
      const idNum = Number(id);

      if (!isNaN(idNum)) {
        const room = await prisma.room.findUnique({
          where: {
            id: idNum,
          },
        });

        const guests = await prisma.guest.findMany({
          where: {
            roomId: idNum,
          },
        });

        if (!guests) {
          return res.status(404).json({ error: "User not found" });
        }

        const pusher = new Pusher({
          appId: process.env.PUSHER_APP_ID,
          key: process.env.NEXT_PUBLIC_PUSHER_KEY,
          secret: process.env.PUSHER_SECRET,
          cluster: "sa1",
          useTLS: true,
        });

        await pusher.trigger("room", "room-event", {
          message: `${JSON.stringify({ guests, room, idNum })}\n\n`,
        });

        return res.status(200).json({ guests, room });
      } else {
        return res.status(400).json({ error: "Invalid ID" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Error fetching user" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
