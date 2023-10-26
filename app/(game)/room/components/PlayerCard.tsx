import GameIcon from "@/public/assets/icons/GameIcon";
import Image from "next/image";
import React from "react";

type PlayerCardProps = {
  id: number;
  username: string;
  profile: number;
  score: number;
  activeID: number;
  role: string;
};
export default function PlayerCard({
  id,
  username,
  profile,
  score,
  activeID,
  role,
}: PlayerCardProps) {
  return (
    <li className="relative w-full grid  grid-cols-3 gap-2 items-center justify-center text-white bg-slate-700 flex-wrap p-1 rounded-lg px-1 ">
      <div className=" w-full text-center col-span-2 ">
        <div
          className={`mx-auto flex-row hover:scale-125 w-12 h-12  rounded-full border-4 ${
            role == "MANEGER"
              ? "border-teal-500"
              : id == activeID
              ? "border-green-600"
              : "border-violet-600"
          } `}
        >
          <Image
            src={`/assets/avatares/${profile}.svg`}
            width={400}
            height={400}
            alt="profile"
            className="w-full mx-auto"
          />
        </div>
        <div className="w-full  p-2 flex justify-center items-center flex-wrap break-words ">
          <abbr
            className="no-underline	 break-words w-full text-center"
            title={username}
          >
            {username.length > 12 ? `${username.slice(0, 12)}...` : username}
          </abbr>
        </div>
      </div>

      {role == "MANEGER" ? (
        <GameIcon className="text-teal-300 w-5 h-5 absolute top-1 right-1" />
      ) : (
        ""
      )}

      <div className="text-xs text-center ">
        <span>Pts.</span> <span className="text-green-500">{score}</span>
      </div>
    </li>
  );
}
