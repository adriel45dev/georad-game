"use client";
import CloseIcon from "@/public/assets/icons/CloseIcon";
import Image from "next/image";
import { useState } from "react";

type AvatarsProps = {
  avataresState: boolean;
  setAvatarsState: React.Dispatch<React.SetStateAction<boolean>>;
  user: {
    [key: string]: string | number;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{ [key: string]: string | number }>
  >;
};

export default function Avatars({
  avataresState,
  setAvatarsState,
  user,
  setUser,
}: AvatarsProps) {
  const [profile, setProfile] = useState(user.profile);

  const handleChooseProfile = () => {
    setUser((prevUser) => ({ ...prevUser, profile: profile }));
    setAvatarsState(false);
  };

  return (
    <div
      className={`${
        avataresState ? "flex" : "hidden"
      } absolute min-w-full min-h-screen bg-slate-900`}
    >
      <div className="w-full flex-1 flex justify-center items-center px-4 md:px-16">
        <div className="w-full">
          <div className="w-full relative  rounded-lg shadow bg-slate-800 my-8">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
              data-modal-hide="room-modal"
              onClick={() => setAvatarsState(false)}
            >
              <CloseIcon className="w-3 h-3" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-4 border-b rounded-t border-gray-600">
              <h3 className="text-base font-semibold lg:text-xl text-white">
                Escolha um avatar
              </h3>
            </div>
            <div className="p-6 flex gap-2 flex-col">
              <div className="w-full gap-2 flex flex-col">
                <p className="text-xs font-normal text-gray-400">
                  Selecione um avatar pra seu perfil.
                </p>

                <ul className="min-w-full min-h-full flex justify-center md:justify-start flex-wrap gap-2 select-none  items-center">
                  {Array.from({ length: 36 }, (_, i) => (
                    <li key={i} onClick={() => setProfile(i)}>
                      <Image
                        src={`/assets/avatares/${i}.svg`}
                        alt={`avatar ${i} `}
                        width={200}
                        height={200}
                        className={`${
                          profile == i
                            ? "border-green-500 border-4"
                            : "opacity-40"
                        } w-16 h-16 md:w-24 md:h-24  rounded-full hover:opacity-100`}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleChooseProfile}
                className="mt-4 inline-flex items-center justify-center p-4 mb-2  overflow-hidden text-sm font-medium  rounded-lg group bg-violet-600 hover:text-white text-white focus:ring-4 focus:outline-none  focus:ring-violet-800"
              >
                Escolher
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
