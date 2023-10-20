import Image from "next/image";
import React from "react";

type PlayerCardProps = {
  id: number;
  username: string;
  profile: number;
  score: number;
  activeID: number;
};
export default function PlayerCard({
  id,
  username,
  profile,
  score,
  activeID,
}: PlayerCardProps) {
  return (
    <li className="min-w-max flex flex-row gap-2 items-center justify-between text-white ">
      <div className="flex flex-row items-center gap-2 w-full flex-wrap">
        <div
          className={`hover:scale-125 w-10 h-10  rounded-full border-4 ${
            id == activeID ? "border-green-600" : "border-violet-600"
          }`}
        >
          <Image
            src={"/assets/avatares/0.svg"}
            width={400}
            height={400}
            alt="profile"
            className="w-full "
          />
        </div>
        <div>{username}</div>
      </div>
      <div className="text-xs flex flex-col md:flex-row  justify-center items-center flex-wrap">
        <span>Pts.</span>
        <span>{score}</span>
      </div>
    </li>
  );
}
