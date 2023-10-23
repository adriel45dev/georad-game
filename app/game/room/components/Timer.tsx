import TimerIcon from "@/public/assets/icons/TimerIcon";
import TimerStartIcon from "@/public/assets/icons/TimerStartIcon";
import React from "react";

type TimerProps = {
  started: boolean;
  minutes: number;
  seconds: number;
  time: number;
};

export default function Timer({ started, minutes, seconds, time }: TimerProps) {
  return (
    <div className="absolute text-gray-400 text-lg top-2 right-4 flex gap-2">
      {started ? (
        <>
          <span className="text-green-400">{`${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</span>
          <TimerStartIcon className="w-6 h-6 text-green-400" />
        </>
      ) : (
        <>
          <span>{time / 60000}:00</span>
          <TimerIcon className="w-6 h-6" />
        </>
      )}{" "}
    </div>
  );
}
