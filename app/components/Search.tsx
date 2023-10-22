import React from "react";

export default function Search() {
  return (
    <form className="min-w-full">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium  sr-only text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4  text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          className="block w-full p-4 pl-10 text-sm border rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-violet-500 focus:border-violet-500"
          placeholder="Buscar formas..."
          required
          list="formas"
        />
        <datalist id="formas">
          <option value="Cubo" />
          <option value="Esfera" />
        </datalist>
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-2 py-2 bg-violet-600 hover:bg-violet-700 focus:ring-violet-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}
