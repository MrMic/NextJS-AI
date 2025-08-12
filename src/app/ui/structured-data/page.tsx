"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { recipeSchema } from "@/app/api/structured-data/schema";

export default function StructuredDataPage() {
  const [dishName, setDishName] = useState("");

  const { submit, object, isLoading, error, stop } = useObject({
    api: "/api/structured-data",
    schema: recipeSchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({ dish: dishName });
    setDishName("");
  };

  return (
    <div className="flex flex-col pt-12 pb-24 mx-auto w-full max-w-2xl">
      {error && <div className="px-4 mb-4 text-red-500">{error.message}</div>}
      {object?.recipe && (
        <div className="px-4 space-y-6">
          <h2 className="text-2xl font-bold">{object.recipe.name}</h2>

          {object?.recipe?.ingredients && (
            <div>
              <h3 className="mb-4 text-xl font-semibold">Ingredients</h3>
              <div className="grid grid-cols-2 gap-4">
                {object.recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800"
                  >
                    <p className="font-medium">{ingredient?.name}</p>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {ingredient?.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {object?.recipe?.steps && (
            <div>
              <h3 className="mb-4 text-xl font-semibold">Steps</h3>
              <ol className="space-y-4">
                {object.recipe.steps.map((step, index) => (
                  <li
                    key={index}
                    className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800"
                  >
                    <span className="mr-2 font-medium">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="fixed right-0 bottom-0 left-0 p-4 mx-auto w-full max-w-2xl border-t shadow-lg bg-zinc-50 border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder="Enter a dish name..."
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
              disabled={isLoading || !dishName}
              className="py-2 px-4 text-white bg-blue-500 rounded transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
