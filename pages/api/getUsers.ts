import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ROLE } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const idNum = Number(id);

      if (!isNaN(idNum)) {
        const guests = await prisma.guest.findMany({
          where: {
            roomId: idNum,
          },
        });

        if (!guests) {
          return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ guests });
      } else {
        return res.status(400).json({ error: "Invalid ID" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Error fetching user" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
