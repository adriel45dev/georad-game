"use client";
import MenuIcon from "@/public/assets/icons/MenuIcon";
import React, { useState, useEffect } from "react";
import PlayerCard from "../components/PlayerCard";
import ButtonSection from "../../components/ButtonSection";
import TriangleIcon from "@/public/assets/icons/TriangleIcon";
import { useRouter } from "next/navigation";
import Pusher from "pusher-js";
import Loading from "@/app/components/Loading";
import Link from "next/link";
import { Room } from "@/app/shared/types/room.type";
import { log } from "console";
import { Guest } from "@/app/shared/types/guest.type";
import Questions from "../components/Questions";
import Timer from "../components/Timer";

type PageProps = {
  params: {
    slug: string;
  };
};
export default function Room({ params: { slug } }: PageProps) {
  const [tooglePlayers, setTooglePlayers] = useState(true);
  const [loading, setLoading] = useState(true);
  const [startingGame, setStartingGame] = useState(false);
  // const [endingGame, setEndingGame] = useState(false);

  const [roomID, setRoomID] = useState(Math.abs(+slug - 3000));

  const [activeUser, setActiveUser] = useState<{
    [key: string]: string | number;
  }>();
  const [players, setPlayers] = useState<
    {
      [key: string]: string | number;
    }[]
  >();
  const [currentRoom, setCurrentRoom] = useState<{
    [key: string]: string | number | boolean;
  }>();
  const [fetched, setFetched] = useState(false);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerStarted, setTimerStarted] = useState<boolean>();

  const router = useRouter();

  const getUsers = async () => {
    if (fetched) return;

    const roomID = +slug - 3000;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getUsers?id=${roomID}`
    );

    const data = await response.json();

    if (response.ok) {
      const { guests, room } = data;
      setCurrentRoom(room);
      setPlayers(guests);
      setLoading(false);
    } else {
      alert(
        "Desculpa esse parece ser um erro no nosso servidor. Tente novamente ou volte mais tarde -- / TENTAR NOVAMENTE / CANCELAR "
      );
      router.push("/game/system");
    }

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
      router.push("/game/system");
    }
  };

  // ROOM -- EVENT TRIGGER {NEW_USER} PUSHER
  useEffect(() => {
    const interval = setTimeout(() => {
      let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
        cluster: "sa1",
      });

      let channel = pusher.subscribe("room");

      channel.bind("room-event", function (data: any) {
        const dataPlayers = JSON.parse(data.message);
        const _roomID = +slug - 3000;

        const { guests, idNum, room } = dataPlayers;

        if (idNum != _roomID) return;

        setCurrentRoom(room);
        setPlayers(guests);
        setLoading(false);
      });
    }, 100);
    return () => clearTimeout(interval);
  }, []);

  // ROOM SATATUS CHANGE -- EVENT TRIGGER {START} PUSHER
  useEffect(() => {
    const interval = setTimeout(() => {
      let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
        cluster: "sa1",
      });

      let channel = pusher.subscribe("room-start");

      channel.bind("room-start-event", function (data: any) {
        const dataRoom = JSON.parse(data.message);
        const { room } = dataRoom;

        if (room.id != roomID) return;

        setCurrentRoom(room);
      });
    }, 100);
    return () => clearTimeout(interval);
  }, []);

  // SCORE CHANGE -- EVENT TRIGGER {SCORE} PUSHER
  useEffect(() => {
    const interval = setTimeout(() => {
      let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
        cluster: "sa1",
      });

      let channel = pusher.subscribe("score");

      channel.bind("score-event", function (data: any) {
        const dataUser = JSON.parse(data.message);
        const { guests, dbRoomID } = dataUser;

        if (dbRoomID != roomID) return;
        setPlayers(guests);
      });
    }, 100);
    return () => clearTimeout(interval);
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (+slug < 3000) return router.push("/game");
      isUserActive();
    }, 1000);

    return () => clearTimeout(interval);
  }, []);

  useEffect(() => {
    if (!activeUser) return;

    const interval = setTimeout(() => {
      const [active] =
        players?.filter((player) => player.id == activeUser.id) || [];

      if (!active) return;

      setActiveUser(active);
    }, 1000);

    return () => clearTimeout(interval);
  }, [players]);

  // useEffect(() => {
  //   if (!activeUser) return;
  //   console.log(activeUser);
  // }, [activeUser]);

  const updateRoom = async () => {
    const dataRoom: Room = {
      id: roomID,
      started: true,
      initTime: String(Date.now()),
    };

    // console.log(dataRoom);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateRoom`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dataRoom }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      const { room } = data;
      setCurrentRoom(room);
      setStartingGame(false);
    } else {
      // falhou
      alert(
        "Algo saiu errado no nosso servidor! Se o problema continuar volte mais tarde 👍"
      );
    }
  };

  const updateScore = async () => {
    const dataUser: Guest = {
      id: activeUser?.id as number,
      score: Number(activeUser?.score) + score,
      roomId: roomID,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateScore`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dataUser }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      const { guests, guest } = data;
      setPlayers(guests);
      setActiveUser(guest);
      setScore(0);
      // saveUser(guest);
    } else {
      // falhou
      alert(
        "Algo saiu errado no nosso servidor! Se o problema continuar volte mais tarde 👍"
      );
    }
  };

  const handleStarPlay = () => {
    // update room -- and trigger real time
    setStartingGame(true);
    updateRoom();
  };

  // TIMER
  useEffect(() => {
    if (!currentRoom) return;

    const endTime = Number(currentRoom?.initTime) + Number(currentRoom?.time);

    const interval = setInterval(() => {
      setTimerStarted(true);
      // setEndingGame(false);
      const timeLeft = endTime - Date.now();

      const minutes = Math.floor(timeLeft / 1000 / 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);

      setMinutes(minutes);
      setSeconds(seconds);

      if (timeLeft <= 0) {
        setTimerStarted(false);

        setMinutes(+currentRoom?.time / 60000);
        setSeconds(0);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentRoom?.started, currentRoom]);

  const [score, setScore] = useState<number>(0);

  // handle score
  const handleScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  useEffect(() => {
    const intervval = setTimeout(() => {
      if (!timerStarted) {
        setCurrentRoom((prevRoom) => ({ ...prevRoom, started: false }));
      }
      if (!timerStarted && score > 0) {
        // alert("A partida terminou -- atualizar o score dos jogadores");
        updateScore();
      }
    }, 1000);
    return () => clearTimeout(intervval);
  }, [timerStarted]);

  return loading ? (
    <Loading />
  ) : (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:px-24 py-4 bg-slate-900 min-w-full gap-4">
      <header className="flex flex-row w-full  justify-between items-center px-4">
        <Link
          href="/game"
          className="text-4xl font-extrabold leading-none tracking-tight  md:text-2xl lg:text-4xl text-white"
        >
          GeoRAD <span className=" text-violet-500">Play</span>
        </Link>

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
          <span className="text-2xl font-bold text-white w-full text-center  break-words px-2">
            Jogadores
          </span>

          <ul className="flex flex-1 w-full max-w-full flex-col p-1 py-4 md:p-4 gap-2 ">
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
          } border rounded-lg border-violet-400 pt-8 flex flex-col items-center w-full relative `}
        >
          <span className="text-2xl font-bold text-white w-full  text-center break-words px-2">
            Partida
          </span>

          {/* PERGUNTA */}
          <Questions
            score={score}
            setScore={setScore}
            started={Boolean(currentRoom?.started)}
          />

          {/* TIMER */}
          <Timer
            started={Boolean(currentRoom?.started)}
            time={Number(currentRoom?.time)}
            minutes={minutes}
            seconds={seconds}
          />
        </div>

        <MenuIcon
          className={`w-8 h-8 text-gray-400 absolute top-0 left-0 ml-4 mt-4 ${
            tooglePlayers ? "rotate-0" : "rotate-90"
          } `}
          onClick={() => setTooglePlayers(!tooglePlayers)}
        />
      </section>

      <div>
        {activeUser?.role == "MANEGER" ? (
          <button onClick={handleStarPlay} disabled={timerStarted}>
            <ButtonSection href="#start">
              <TriangleIcon
                className={`text-violet-900 w-8 h-8 ${
                  startingGame ? "animate-spin" : "animate-pulse"
                }`}
              />
              <span className="group-hover:text-violet-600 text-base">
                {timerStarted
                  ? "JOGANDO"
                  : startingGame
                  ? "INICIANDO ..."
                  : "COMEÇAR"}
              </span>
            </ButtonSection>
          </button>
        ) : (
          <ButtonSection href="#player">
            <TriangleIcon className="text-violet-900 w-8 h-8 animate-pulse" />
            <span className="group-hover:text-violet-600 text-base animate-pulse">
              {timerStarted ? "JOGANDO" : "AGURDANDO O GERENCIADOR DA SALA..."}
            </span>
          </ButtonSection>
        )}
      </div>
    </main>
  );
}
