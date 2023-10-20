"use client";
import CloseIcon from "@/public/assets/icons/CloseIcon";
import Link from "next/link";
import { useState } from "react";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

type RoomStartProps = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  user: { [key: string]: string | number };
  setUser: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string | number;
    }>
  >;
};

export default function RoomStart({
  state,
  setState,
  user,
  setUser,
}: RoomStartProps) {
  const [room, setRoom] = useState("");
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  // Verificar se já há um usuário conectado, caso contrario criar um / associar o usuario a sala buscada

  const saveUser = (guest: { [key: string]: string | number }) => {
    const dataJSON = JSON.stringify(guest);
    localStorage.setItem("user", dataJSON);
    setUser(guest);
  };

  const createGuest = async () => {
    setLoading(true);
    const roomID = +room - 3000;

    const response = await fetch("/api/postGuest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, roomID }),
    });

    const data = await response.json();

    if (response.ok) {
      const { guest, room } = data;
      saveUser(guest);
      router.push(`/game/room/${room.id + 3000}`);
    } else {
      alert("A sala informada não existe");
    }

    setLoading(false);
  };

  const updateGuest = async () => {
    setLoading(true);
    const roomID = +room - 3000;

    const response = await fetch("/api/updateGuest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, roomID }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push(`/game/room/${room}`);
    } else {
      alert("A sala informada não existe");
    }

    setLoading(false);
  };

  const handleUserData = () => {
    if (+room < 3000) return alert("Código Inválido.");

    if (user.id != -1) return updateGuest();

    if (!room) return alert("Digite o código da sala.");

    if (!user.username) {
      alert("Parece que você esqueceu de escolher um username.");
      return setState(false);
    }

    // Create a new user
    createGuest();
    // validate room
  };

  const handleInputRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRoom(value.toUpperCase().replace(/\s+/g, "").trim());
  };
  return (
    <div
      className={`${
        state ? "flex" : "hidden"
      } fixed flex-col justify-center items-center w-full h-screen backdrop-blur-sm bg-white/30 top-0 right-0 duration-150 z-50`}
    >
      <div className="w-full flex justify-center items-center px-16">
        <div className="w-full">
          <div className="relative  rounded-lg shadow bg-slate-900">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
              data-modal-hide="room-modal"
              onClick={() => setState(false)}
            >
              <CloseIcon className="w-3 h-3" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-4 border-b rounded-t border-gray-600">
              <h3 className="text-base font-semibold lg:text-xl text-white">
                Sala
              </h3>
            </div>
            <div className="p-6 flex gap-2 flex-col">
              <p className="text-xs font-normal text-gray-400">
                Digite o código da sala.
              </p>

              <input
                className="border-b-2 border-gray-600 transition duration-500 ease-in-out focus:border-violet-600 bg-transparent text-white focus:outline-none focus:ring-0 text-4xl"
                placeholder={"SALA"}
                value={room}
                onChange={handleInputRoom}
                type="number"
              />

              <button
                // href={`/game/room/${room}`}
                disabled={isLoading}
                onClick={handleUserData}
                className="mt-4 inline-flex items-center justify-center p-4 mb-2  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-violet-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none  focus:ring-violet-800"
              >
                Conectar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
