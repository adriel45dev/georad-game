"use client";
import MenuIcon from "@/public/assets/icons/MenuIcon";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  return (
    <header className="w-full flex-col bg-slate-900 pb-2">
      <div className="w-full flex flex-row bg-violet-900 justify-between items-center px-8 py-4 text-white flex-wrap">
        <Link href="/">
          <h1 className="text-white text-lg font-semibold">GeoRAD</h1>
        </Link>
        <nav className="md:flex gap-2 flex-wrap hidden">
          <button className="px-4 py-2 rounded-lg border-b  hover:border-b-blue-400 hover:text-blue-400 font-semibold">
            Criação
          </button>
          <button className="px-4 py-2 rounded-lg border-b  hover:border-b-blue-400 hover:text-blue-400 font-semibold">
            Calculadora
          </button>
          <Link
            href={"/game"}
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
        <button className="hover:text-blue-400 border-r pr-2 rounded-r-lg">
          Criação
        </button>
        <button className="hover:text-blue-400 border-r pr-2 rounded-r-lg">
          Calculadora
        </button>
        <Link href={"/game"} className="hover:text-blue-400">
          Jogo
        </Link>
      </div>
    </header>
  );
}
