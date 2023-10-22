import React from "react";
import ButtonSection from "./components/ButtonSection";
import AccountIcon from "@/public/assets/icons/AccountIcon";
import GoogleIcon from "@/public/assets/icons/GoogleIcon";
import Image from "next/image";
import GameIcon from "@/public/assets/icons/GameIcon";

export default function Game() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:px-24 py-4 bg-slate-900 min-w-full relative bg-[url('/img/hero-pattern.svg')] ">
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="z-10 col-span-3">
          <header className="flex flex-col min-w-full  justify-center items-centerm pt-8">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl text-white">
              GeoRAD <span className=" text-violet-500">Game</span> .
            </h1>
            <p className="text-lg font-normal  lg:text-xl text-gray-400">
              Com o GeoRAD você vai aprender geometria sem nem ver o tempo
              passar. Garanta suas habilidades craques em ângulos, polígonos,
              simetria e muito mais. Seja o campeão em geometria com o GeoRAD!
            </p>
          </header>

          <section className="flex flex-col min-w-max py-8 justify-center items-center">
            <div className="flex flex-row gap-2 w-max">
              <ButtonSection href="/game/system">
                <GameIcon className="text-violet-900 w-8 h-8" />
                <span className="group-hover:text-violet-600">
                  COMEÇAR A JOGAR
                </span>
              </ButtonSection>
            </div>
            <span className="text-gray-400 p-6">ou crie uma conta:</span>
            <div className="flex flex-row gap-2 w-max">
              <ButtonSection href="#google">
                <AccountIcon className="text-violet-900 w-8 h-8 group-hover:animate-pulse" />
                <span className="w-max text-[0] absolute group-hover:text-lg group-hover:relative delay-150 transition ease-in-out scale-0 group-hover:scale-100 group-hover:text-violet-600">
                  com e-mail
                </span>
              </ButtonSection>
              <ButtonSection href="#google">
                <GoogleIcon className="text-violet-900 w-8 h-8 group-hover:animate-pulse" />
                <span className="w-max text-[0] absolute group-hover:text-lg group-hover:relative delay-150 transition ease-in-out scale-0 group-hover:scale-100 group-hover:text-violet-600">
                  com Google
                </span>
              </ButtonSection>
            </div>
          </section>
        </div>

        <div className="z-10 col-span-2 text-white min-w-full flex-1 flex items-center justify-center ">
          <GameIcon className="w-60 h-60 text-violet-400 " />
        </div>
      </div>

      <Image
        src={"/imgs/bg-game-04.jpeg"}
        fill
        alt={""}
        className="object-cover rounded-lg opacity-10"
      />
    </main>
  );
}
