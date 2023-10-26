"use client";
import React, { useEffect, useState } from "react";
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
import Avatars from "@/app/components/Avatars";
import LogoutIcon from "@/public/assets/icons/LogoutIcon";

export default function System() {
  const [state, setState] = useState(false);
  const [createRoomState, setCreateRoomState] = useState(false);
  const [shareRoomState, setShareRoomState] = useState(false);
  const [avataresState, setAvatarsState] = useState(false);

  const [sala, setSala] = useState(3000);
  const [profile, setProfile] = useState(0);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<{ [key: string]: string | number }>({
    id: -1,
    username: "",
    profile: 0,
  });
  const [hasUser, setHasUser] = useState(false);
  const router = useRouter();

  const verifyUser = () => {
    const dataJSON = localStorage.getItem("user");
    if (dataJSON) {
      const data = JSON.parse(dataJSON);
      setUser(data);
      setHasUser(true);
    } else {
      usernameGerator();
    }
  };

  const removeUser = () => {
    localStorage.removeItem("user");
    // remover do banco de dados
    router.push(`/`);
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
    <main className="flex min-h-screen flex-col items-center p-8 md:px-44 py-4 bg-slate-900 min-w-full  gap-y-6">
      <header className="max-w-max flex flex-row min-w-full  justify-center items-centerm  w-full mt-6">
        <h1 className=" text-6xl font-extrabold leading-none tracking-tight  text-white text-center flex flex-wrap gap-2">
          GeoRAD <span className="text-violet-500">Game</span>
        </h1>
      </header>

      <section className="flex flex-1 flex-col  md:flex-row gap-2 w-full h-full justify-center items-center p-4 rounded-lg bg-slate-850">
        {/* Guest */}
        <div className="flex flex-col md:flex-row gap-2 gap-y-6">
          {/* Profile */}
          <div className="flex justify-center items-center w-full relative">
            <div
              className={`${
                hasUser ? "border-green-600" : "border-violet-600"
              } flex p-2 border-4  rounded-full w-max`}
            >
              <Image
                src={`/assets/avatares/${user.profile}.svg`}
                alt="profile"
                width={200}
                height={200}
                className="w-40 h-40"
              />
            </div>

            {/* Edit Button */}
            {!hasUser && (
              <div
                onClick={() => setAvatarsState(true)}
                className="group w-12 h-12 bg-slate-900 rounded-full absolute border-gray-400 top-2 right-2 p-1"
              >
                <div className="group-hover:bg-violet-500 w-full h-full rounded-full bg-white flex justify-center items-center">
                  <EditIcon className="w-8 h-8 text-violet-600 group-hover:text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Nickname / Logout */}
          <div className="flex flex-col  justify-center items-start px-4 gap-2">
            <input
              className={`${
                hasUser ? "border-b-green-600" : "border-b-gray-600"
              }  appearance-none border-transparent border-b-2  transition duration-500 ease-in-out focus:border-b-violet-600 focus:border-t-none focus:border-transparent bg-transparent text-white focus:outline-none focus:ring-0`}
              placeholder={"username"}
              onChange={handleInputUsername}
              value={user.username}
              readOnly={hasUser}
            />
            {hasUser && (
              <button
                className="text-bold text-violet-500 flex gap-2 hover:text-red-400"
                onClick={removeUser}
              >
                <LogoutIcon className="w-6 h-6" />
                <span>Sair</span>
              </button>
            )}
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
        profile={user.profile as number}
        username={user.username as string}
        setShareRoomState={setShareRoomState}
      />
      <RoomShare
        shareRoomState={shareRoomState}
        setShareRoomState={setShareRoomState}
        sala={sala}
      />

      <Avatars
        setAvatarsState={setAvatarsState}
        avataresState={avataresState}
        user={user}
        setUser={setUser}
      />
    </main>
  );
}
