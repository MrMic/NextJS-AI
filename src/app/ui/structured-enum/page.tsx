"use client";

import { useState } from "react";

export default function StructuredEnumPage() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeSentiment = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);
    setText("");

    try {
      const response = await fetch("/api/structured-enum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSentiment(data);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col py-24 mx-auto w-full max-w-md stretch">
      {error && <div className="mb-4 text-red-500">{error}</div>}

      {isLoading ? (
        <div className="text-center">Analyzing sentiment...</div>
      ) : sentiment ? (
        <div className="text-center">
          <div className="text-3xl font-bold">
            {sentiment === "positive" && "😊 Positive"}
            {sentiment === "negative" && "😞 Negative"}
            {sentiment === "neutral" && "😐 Neutral"}
          </div>
        </div>
      ) : null}

      <form
        onSubmit={analyzeSentiment}
        className="fixed right-0 bottom-0 left-0 p-4 mx-auto w-full max-w-md border-t shadow-lg bg-zinc-50 border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800"
      >
        <div className="flex gap-2">
          <input
            className="flex-1 p-2 rounded border shadow-xl border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to analyze..."
          />
          <button
            type="submit"
            className="py-2 px-4 text-white bg-blue-500 rounded transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !text.trim()}
          >
            Analyze
          </button>
        </div>
      </form>
    </div>
  );
}
