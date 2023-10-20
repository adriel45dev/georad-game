"use client";
import MenuIcon from "@/public/assets/icons/MenuIcon";
import React, { useState, useEffect } from "react";
import PlayerCard from "../components/PlayerCard";
import ButtonSection from "../../components/ButtonSection";
import TriangleIcon from "@/public/assets/icons/TriangleIcon";
import { useRouter } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};
export default function Room({ params: { slug } }: PageProps) {
  const [tooglePlayers, setTooglePlayers] = useState(true);
  const [loading, setLoading] = useState(false);

  const [activeUser, setActiveUser] = useState<{
    [key: string]: string | number;
  }>();
  const [players, setPlayers] = useState<
    {
      [key: string]: string | number;
    }[]
  >();
  const [fetched, setFetched] = useState(false);

  const router = useRouter();

  const getUsers = async () => {
    if (fetched) return;
    console.log("GET USERS");

    setLoading(true);
    const roomID = +slug - 3000;
    console.log(roomID);

    const response = await fetch(`/api/getUsers?id=${roomID}`);

    const data = await response.json();

    if (response.ok) {
      const { guests } = data;
      setPlayers(guests);
    } else {
      alert("Não foi possível obter os dados dos jogadores");
    }

    setLoading(false);
    setFetched(true);
  };

  const isUserActive = async () => {
    if (activeUser) return;
    const dataJSON = localStorage.getItem("user");
    if (dataJSON) {
      const data = JSON.parse(dataJSON);
      setActiveUser((prevActiveUser) => ({ ...data }));
      getUsers();
    } else {
      router.push("/game");
    }
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      if (+slug < 3000) return router.push("/game");
      isUserActive();
    }, 1000);

    return () => clearTimeout(interval);
  }, []);

  useEffect(() => {
    if (!activeUser) return;
    console.log(activeUser);
  }, [activeUser]);

  useEffect(() => {
    if (!players) {
      // router.push("/game/system");
    }
  }, [players]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:px-24 py-4 bg-slate-900 min-w-full gap-4">
      <header className="flex flex-row w-full  justify-between items-center px-4">
        <h1 className=" text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">
          GeoRAD{" "}
          <span className="text-violet-600 dark:text-violet-500">Play</span>
        </h1>

        <div className="border rounded-full p-4 text-white flex-wrap text-center">
          SALA: <span className="text-violet-600 font-bold">{slug}</span>
        </div>
      </header>

      <section className="min-w-full flex-1 flex-row grid grid-cols-5 rounded-lg bg-slate-800 relative p-2 gap-1">
        {/* JOGADORES */}
        <div
          className={`${
            tooglePlayers ? "md:col-span-1 col-span-3" : "hidden"
          } border rounded-lg border-violet-400 pt-8 flex w-full flex-col items-center px-2`}
        >
          <span className="text-2xl font-bold text-white">Jogadores</span>

          <ul className="flex flex-1 w-full flex-col px-4 py-4 gap-2">
            {players?.map((player, key) => (
              <PlayerCard
                key={key}
                id={Number(player.id)}
                username={String(player.username)}
                profile={Number(player.profile)}
                score={Number(player.score)}
                activeID={Number(activeUser?.id)}
              />
            ))}
          </ul>
        </div>

        {/* PARTIDA */}
        <div
          className={`${
            tooglePlayers ? "md:col-span-4 col-span-2" : "col-span-5"
          } border rounded-lg border-violet-400 pt-8 flex flex-col items-center w-full relative`}
        >
          <span className="text-2xl font-bold text-white">Partida</span>

          {/* PERGUNTA */}
          <div className="flex flex-row justify-center w-full text-violet-400 flex-1 mt-8">
            <span className="text-bold text-2xl text-center">
              Qual a foma geometrica tem 3 lados iguais?
            </span>
          </div>

          {/* TIMER */}
          <div className="absolute text-gray-400 text-lg top-2 right-4">
            3:52
          </div>
        </div>

        <MenuIcon
          className={`w-8 h-8 text-gray-400 absolute top-0 left-0 ml-4 mt-4 ${
            tooglePlayers ? "rotate-0" : "rotate-90"
          } `}
          onClick={() => setTooglePlayers(!tooglePlayers)}
        />
      </section>

      <div>
        <ButtonSection href="#sala">
          <TriangleIcon className="text-violet-900 w-8 h-8 animate-pulse" />
          <span className="group-hover:text-violet-600 text-base animate-pulse">
            AGURDANDO O GERENCIADOR DA SALA...
          </span>
        </ButtonSection>
      </div>
    </main>
  );
}
