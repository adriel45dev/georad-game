"use client";
import CloseIcon from "@/public/assets/icons/CloseIcon";
import { Guest } from "../shared/types/guest.type";
import { Room } from "../shared/types/room.type";
import { useState } from "react";
import Alert from "./Alert";

type RoomStartProps = {
  createRoomState: boolean;
  setCreateRoomState: React.Dispatch<React.SetStateAction<boolean>>;
  sala: number;
  setSala: React.Dispatch<React.SetStateAction<number>>;
  username: string;
  profile: number;
  setShareRoomState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RoomCreate({
  createRoomState,
  setCreateRoomState,
  sala,
  username,
  profile,
  setSala,
  setShareRoomState,
}: RoomStartProps) {
  // let time = "0";

  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertState, setAlertState] = useState(false);

  const handleInputTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAlertState(false);
    if (+value < 0) return setTime("0");
    setTime(value.replace(/[^0-9]/g, ""));
  };

  const saveUser = (guest: { [key: string]: string | number }) => {
    const dataJSON = JSON.stringify(guest);
    localStorage.setItem("user", dataJSON);
  };

  // e: React.FormEvent<HTMLFormElement>
  const createRoom = async () => {
    setLoading(true);

    const guest: Guest = {
      username: username,
      profile: profile,
    };

    const room: Room = {
      time: +time * 60000,
    };

    const response = await fetch(`/api/postRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guest, room }),
    });

    const data = await response.json();

    if (response.ok) {
      const { guest, room } = data;
      setSala(room.id);
      saveUser(guest);
      setCreateRoomState(false);
      setShareRoomState(true);
    }

    setLoading(false);
  };

  const handleCreateRoom = () => {
    if (+time <= 0) {
      setAlertMessage("Determine o tempo mínimo da partida.");
      setAlertState(true);
      return;
    }

    createRoom();
  };

  return (
    <div
      className={`${
        createRoomState ? "flex" : "hidden"
      } fixed flex-col justify-center items-center w-full h-screen backdrop-blur-sm bg-white/30 top-0 right-0 duration-150 z-50`}
    >
      <div className="min-w-full flex flex-col justify-center items-center px-16">
        {alertState && <Alert text={alertMessage} />}
        <div className="w-full">
          <div className="relative  rounded-lg shadow bg-slate-900">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
              data-modal-hide="room-modal"
              onClick={() => setCreateRoomState(false)}
            >
              <CloseIcon className="w-3 h-3" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-4 border-b rounded-t border-gray-600">
              <h3 className="text-base font-semibold lg:text-xl text-white">
                Criar sala
              </h3>
            </div>
            <div className="p-6 flex gap-2 flex-col">
              <div className="w-full gap-2 flex flex-col">
                <p className="text-xs font-normal text-gray-400">
                  Qual será o tempo da partida. / tempo em minutos
                </p>
                <input
                  id="time"
                  name="time"
                  className="w-full border-b-2 border-b-gray-600 border-transparent transition duration-500 ease-in-out focus:border-b-violet-600 focus:border-transparent bg-transparent text-white focus:outline-none focus:ring-0 text-4xl"
                  placeholder={"0"}
                  value={time}
                  onChange={handleInputTime}
                  type="text"
                  min={0}
                  inputMode="numeric"
                />
                <span className="text-gray-400 text-xs">
                  {+time > 1 || +time == 0 ? "minutos" : "minuto"}
                </span>
              </div>

              <button
                disabled={loading}
                onClick={handleCreateRoom}
                className={`${
                  loading
                    ? "bg-slate-800 border-green-500 border"
                    : "bg-violet-600"
                } mt-4 inline-flex items-center justify-center p-4 mb-2  overflow-hidden text-sm font-medium  rounded-lg group  hover:text-white text-white focus:ring-4 focus:outline-none  focus:ring-violet-800`}
              >
                {loading ? (
                  <span className="animate-pulse">Criando ...</span>
                ) : (
                  "Criar"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
