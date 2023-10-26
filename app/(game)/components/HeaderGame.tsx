"use client";
import LogoIcon from "@/public/assets/icons/LogoIcon";
import MenuIcon from "@/public/assets/icons/MenuIcon";
import Link from "next/link";
import { useState } from "react";

export default function HeaderGame() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  return (
    <header className="w-full flex-col bg-slate-900 pb-2">
      <div className="w-full flex flex-row bg-violet-900 justify-between items-center px-8 py-4 text-white flex-wrap">
        <Link
          href="/"
          className="flex justify-center items-center gap-2 hover:text-violet-200 text-white"
        >
          <LogoIcon className="w-10 h-10 " />
          <h1 className=" text-lg font-semibold">GeoRAD Game</h1>
        </Link>
        <nav className="md:flex gap-2 flex-wrap hidden">
          <Link
            href={"/boot.html"}
            className="px-4 py-2 rounded-lg border-b  hover:border-b-blue-400 hover:text-blue-400 font-semibold"
          >
            Início
          </Link>

          <Link
            href={"/"}
            className="px-4 py-2 rounded-lg border-b text-green-400  hover:border-b-blue-400 hover:text-blue-400 font-semibold"
          >
            Jogo
          </Link>
        </nav>
        <MenuIcon
          onClick={() => setIsMenuActive(!isMenuActive)}
          className="md:hidden w-8 h-8 text-gray-100 hover:animate-pulse "
        />
      </div>
      <div
        className={`${
          isMenuActive ? "flex" : "hidden"
        } text-white text-sm w-full md:hidden rounded-b-full shadow-md drop-shadow-2xl shadow-violet-400  flex-row justify-center items-center gap-2 px-4 py-2 bg-violet-800`}
      >
        <Link
          href={"/boot.html"}
          className="hover:text-blue-400 border-r pr-2 rounded-r-lg"
        >
          Início
        </Link>

        <Link href={"/"} className="hover:text-blue-400">
          Jogo
        </Link>
      </div>
    </header>
  );
}
