import CloseIcon from "@/public/assets/icons/CloseIcon";

import Link from "next/link";
import ShareButton from "./ShareButton";

type RoomStartProps = {
  shareRoomState: boolean;
  setShareRoomState: React.Dispatch<React.SetStateAction<boolean>>;
  sala: number;
};

export default function RoomShare({
  shareRoomState,
  setShareRoomState,
  sala,
}: RoomStartProps) {
  return (
    <div
      className={`${
        shareRoomState ? "flex" : "hidden"
      } fixed flex-col justify-center items-center w-full h-screen backdrop-blur-sm bg-white/30 top-0 right-0 duration-150 z-50`}
    >
      <div className="w-full flex justify-center items-center px-16">
        <div className="w-full">
          <div className="relative  rounded-lg shadow bg-slate-900">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
              data-modal-hide="room-modal"
              onClick={() => setShareRoomState(false)}
            >
              <CloseIcon className="w-3 h-3" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-4 border-b rounded-t border-gray-600">
              <h3 className="text-base font-semibold lg:text-xl text-white">
                Compartilhe
              </h3>
            </div>
            <div className="p-6 flex flex-col gap-y-6">
              <div className="w-full flex gap-2 flex-col">
                <p className="text-xs font-normal text-gray-400">Código</p>

                <input
                  className="w-full border-b-2 border-gray-600 transition duration-500 ease-in-out focus:border-violet-600 bg-transparent text-white focus:outline-none focus:ring-0 text-4xl"
                  value={sala + 3000}
                  readOnly
                />
              </div>

              <div className="w-full gap-2 flex flex-col">
                <p className="text-xs font-normal text-gray-400">
                  Compartilhe o código da sala com seus amigos.
                </p>
                <Link
                  className="text-violet-400 text-2xl flex-wrap break-words"
                  href={`/game/room/${sala + 3000}`}
                >
                  {`https://georad.vercel.app/game/${sala + 3000}`}
                </Link>
              </div>

              <div className="w-full flex flex-col md:flex-row  justify-start items-center gap-2 grid-cols-1 md:grid-cols-5">
                <div className="flex col-span-1 md:col-span-3 w-full  justify-center items-center gap-6 flex-wrap">
                  <ShareButton
                    url={`https://georad.vercel.app/game/room/${sala + 3000}`}
                  />
                </div>

                <Link
                  href={`/game/room/${sala + 3000}`}
                  className="w-full flex items-center justify-center p-4 text-sm font-medium text-gray-900 rounded-lg group bg-violet-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none  focus:ring-violet-800"
                >
                  Entrar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
