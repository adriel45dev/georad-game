"use client";
import React, { ReactNode, useEffect, useState } from "react";
import ButtonSection from "../components/ButtonSection";
import Image from "next/image";
import RoomStart from "@/app/components/RoomStart";
import RoomCreate from "@/app/components/RoomCreate";
import EditIcon from "@/public/assets/icons/EditIcon";
import TriangleIcon from "@/public/assets/icons/TriangleIcon";
import SettingIcon from "@/public/assets/icons/SettingIcon";
import RoomShare from "@/app/components/RoomShare";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

export default function System() {
  const [state, setState] = useState(false);
  const [createRoomState, setCreateRoomState] = useState(false);
  const [shareRoomState, setShareRoomState] = useState(false);
  const [sala, setSala] = useState(3000);
  const [profile, setProfile] = useState(0);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<{ [key: string]: string | number }>({
    id: -1,
    username: "",
    profile: 0,
  });
  const router = useRouter();

  const verifyUser = () => {
    const dataJSON = localStorage.getItem("user");
    if (dataJSON) {
      const data = JSON.parse(dataJSON);
      setUser(data);
    } else {
      usernameGerator();
    }
  };

  const removeUser = () => {
    localStorage.removeItem("user");
    // remover do banco de dados
    router.push(`/game`);
  };

  const usernameGerator = () => {
    const randomUsername = nanoid(8);
    setUser((prevUser) => ({ ...prevUser, username: randomUsername }));
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const handleInputUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUser((prevUser) => ({ ...prevUser, username: value }));
  };

  // Verify if a user is logged in

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:px-24 py-4 bg-slate-900 min-w-full ">
      <header className="flex flex-col min-w-full  justify-center items-centerm pt-8">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          GeoRAD{" "}
          <span className="text-violet-600 dark:text-violet-500">Game</span> .
        </h1>
      </header>

      <section className="flex flex-col flex-1 md:flex-row gap-2 w-full h-full justify-center items-center">
        {/* Guest */}
        <div className="flex flex-col md:flex-row gap-2 gap-y-6">
          {/* Profile */}
          <div className="flex justify-center items-center w-full relative">
            <div className="flex p-2 border-4 border-violet-600 rounded-full w-max">
              <Image
                src="/assets/avatares/0.svg"
                alt="profile"
                width={200}
                height={200}
                className="w-40 h-40"
              />
            </div>

            {/* Edit Button */}
            <div className="group w-12 h-12 bg-slate-900 rounded-full absolute border-gray-400 top-2 right-2 p-1">
              <div className="group-hover:bg-violet-500 w-full h-full rounded-full bg-white flex justify-center items-center">
                <EditIcon className="w-8 h-8 text-violet-600 group-hover:text-white" />
              </div>
            </div>
          </div>

          {/* Nickname / Logout */}
          <div className="flex flex-col  justify-center items-start px-4 gap-2">
            <input
              className="border-b-2 border-gray-600 transition duration-500 ease-in-out focus:border-violet-600 bg-transparent text-white focus:outline-none focus:ring-0"
              placeholder={"username"}
              onChange={handleInputUsername}
              value={user.username}
            />

            <button
              className="text-normal text-violet-500"
              onClick={removeUser}
            >
              {">"} Log out
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col w-full  p-4 justify-center items-start gap-2">
          <div className="w-full" onClick={() => setState(true)}>
            <ButtonSection href="#sala">
              <TriangleIcon className="text-violet-900 w-8 h-8" />
              <span className="group-hover:text-violet-600 text-base ">
                ENTRAR
              </span>
            </ButtonSection>
          </div>
          <div className="w-full" onClick={() => setCreateRoomState(true)}>
            <ButtonSection href="#criar-sala">
              <SettingIcon className="text-violet-900 w-8 h-8 " />
              <span className="group-hover:text-violet-600 text-base">
                CRIAR SALA
              </span>
            </ButtonSection>
          </div>
        </div>
      </section>

      <RoomStart
        state={state}
        setState={setState}
        user={user}
        setUser={setUser}
      />
      <RoomCreate
        createRoomState={createRoomState}
        setCreateRoomState={setCreateRoomState}
        sala={sala}
        setSala={setSala}
        profile={profile}
        username={username}
        setShareRoomState={setShareRoomState}
      />
      <RoomShare
        shareRoomState={shareRoomState}
        setShareRoomState={setShareRoomState}
        sala={sala}
      />
    </main>
  );
}
