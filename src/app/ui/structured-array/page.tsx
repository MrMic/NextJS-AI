"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { pokemonUISchema } from "@/app/api/structured-array/schema";
import { useState } from "react";

export default function StructuredArrayPage() {
  const [type, setType] = useState("");
  const { object, submit, isLoading, error, stop } = useObject({
    api: "/api/structured-array",
    schema: pokemonUISchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({ type });
    setType("");
  };

  return (
    <div className="flex flex-col pt-12 pb-24 mx-auto w-full max-w-2xl">
      {error && <div className="px-4 mb-4 text-red-500">{error.message}</div>}

      <div className="space-y-8">
        {object?.map((pokemon) => (
          <div
            key={pokemon?.name}
            className="p-6 rounded-lg shadow-sm bg-zinc-50 dark:bg-zinc-800"
          >
            <h2 className="mb-4 text-2xl font-bold">{pokemon?.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              {pokemon?.abilities?.map((ability) => (
                <div
                  key={ability}
                  className="p-3 rounded-md bg-zinc-100 dark:bg-zinc-700"
                >
                  {ability}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed right-0 bottom-0 left-0 p-4 mx-auto w-full max-w-2xl border-t shadow-lg bg-zinc-50 border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Enter a type..."
            className="flex-1 p-2 rounded border shadow-xl border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700"
          />
          {isLoading ? (
            <button
              type="button"
              onClick={stop}
              className="py-2 px-4 text-white bg-red-500 rounded transition-colors hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || !type.trim()}
              className="py-2 px-4 text-white bg-blue-500 rounded transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
