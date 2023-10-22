"use client";
import GameIcon from "@/public/assets/icons/GameIcon";
import React, { useEffect, useState } from "react";

export default function Loading() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setContador((c) => c + 5);
    }, 2000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-center p-8 md:px-24 py-4 bg-slate-900 min-w-full gap-4">
      <GameIcon className="animate-pulse text-violet-500  w-20 h-20" />
      <span className="font-bold text-xs animate-bounce px-4 py-2 text-gray-400 bg-slate-800 border border-violet-500 rounded-full flex justify-center items-center">
        {contador}%
      </span>
      <h1 className="text-4xl font-bold text-gray-400 text-center">
        Entrando na sala <span className="animate-ping">...</span>
      </h1>
    </main>
  );
}
