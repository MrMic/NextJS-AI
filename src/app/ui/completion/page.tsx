"use client";

import React, { useState } from "react";

export default function CompletionPage() {
  const [prompt, setPrompt] = useState(""); // State to hold the user's input prompt
  const [completion, setCompletion] = useState(""); // AI Response state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null);

  const complete = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    setPrompt(""); // Clear the input field after submission
    try {
      // Simulate an API call to get a completion (replace with actual API call)
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong while fetching the completion.",
        );
      }

      setCompletion(data.text); // Set the completion text from the response
    } catch (error) {
      console.error("Error fetching completion:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col w-full  max-w-md py-24 mx-auto stretch">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : completion ? (
        <div className="white-space-pre-wrap">{completion}</div>
      ) : null}

      {/* Display area for completion will go here. */}
      <form
        onSubmit={complete}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-lg"
      >
        <div>
          <input
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-700 rounded shadow-xl"
            placeholder="How can I help you,"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
