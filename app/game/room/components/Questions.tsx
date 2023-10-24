"use client";
import { QUESTIONS } from "@/app/shared/data";
import React, { useEffect, useState } from "react";

type QuestionsProps = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  started: boolean;
};

export default function Questions({
  score,
  setScore,
  started,
}: QuestionsProps) {
  const [questions, setQuestions] = useState(QUESTIONS);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  const [selectedOption, setSelectedOption] = useState(0);

  // SORT OPTIONS
  useEffect(() => {
    const prev = [...Object.keys(questions[questionIndex].options)];
    prev.sort(() => Math.random() - 0.5);
    console.log(prev);

    setOptions(prev);
  }, [questionIndex]);

  useEffect(() => {
    if (started) {
      setQuestionIndex(0);
      setScore(0);
    }
  }, [started]);

  const handleNextQuestion = () => {
    setSelectedOption(0);

    if (options[selectedOption] == "answer") {
      setScore((prevScore) => prevScore + 1);
      console.log(score);
    }
    if (questionIndex + 1 > questions.length - 1) return setHasEnded(true);
    setQuestionIndex((i) => i + 1);
  };

  return started ? (
    !hasEnded ? (
      <div className="gap-4 hyphens-auto flex flex-col justify-start items-center w-full text-violet-400 flex-1 mt-8 p-2">
        <span className="text-bold text-lg text-center max-w-max break-words">
          {questions[questionIndex].question}
        </span>

        <div className="flex flex-col gap-2 w-full px-4">
          {options.map((key, i) => {
            const option = questions[questionIndex].options[key];
            return (
              <div
                key={i}
                className="flex flex-row w-full items-center  bg-slate-700 p-2 rounded-2xl flex-wrap"
              >
                <input
                  onClick={() => setSelectedOption(i)}
                  onChange={() => {}}
                  checked={i == selectedOption}
                  id="option"
                  type="radio"
                  name="colored-radio"
                  className="w-4 h-4 text-purple-600   focus:ring-purple-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                />
                <label
                  htmlFor="option"
                  className="ml-2 text-sm font-medium text-gray-300 break-words max-w-full"
                >
                  {option}
                </label>
              </div>
            );
          })}
        </div>

        <div className="w-full flex justify-center items-center">
          <button
            className="bg-slate-900 p-2 rounded-2xl focus:ring-2 focus:ring-violet-500"
            onClick={handleNextQuestion}
          >
            Responder
          </button>
        </div>
      </div>
    ) : (
      <div className="gap-4 hyphens-auto flex flex-col justify-start items-center w-full text-violet-400 flex-1 mt-8 p-2">
        <span className="text-4xl">🏆 FIM 🏆</span>
        <span className="text-2xl text-white">Acertos: {score}</span>
      </div>
    )
  ) : (
    <div className="gap-4 hyphens-auto flex flex-col justify-start items-center w-full text-violet-400 flex-1 mt-8 p-2">
      <span className="text-2xl break-words w-full text-center animate-pulse">
        Agurdando ....
      </span>
    </div>
  );
}
