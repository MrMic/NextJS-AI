"use client";

import { useState } from "react";

export default function GenerateAudioPage() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);
    setText("");

    try {
      const response = await fetch("/api/generate-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate audio");
      }

      // Get the audio data as a blob directly
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);

      // Store the audio element
      setCurrentAudio(audio);

      // Play the audio
      audio.play();

      // Don't clean up immediately - let user replay
    } catch (error) {
      console.error("Error generating audio:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const replayAudio = () => {
    if (currentAudio) {
      currentAudio.currentTime = 0;
      currentAudio.play();
    }
  };

  return (
    <div className="flex flex-col py-24 mx-auto w-full max-w-md stretch">
      {error && <div className="mb-4 text-red-500">{error}</div>}

      {isLoading && <div className="mb-4 text-center">Generating audio...</div>}

      {currentAudio && !isLoading && (
        <button
          onClick={replayAudio}
          className="py-2 px-4 mb-4 bg-gray-200 rounded transition-colors dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Replay Audio
        </button>
      )}

      <form
        onSubmit={handleSubmit}
        className="fixed right-0 bottom-0 left-0 p-4 mx-auto w-full max-w-md border-t shadow-lg bg-zinc-50 border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800"
      >
        <div className="flex gap-2">
          <input
            className="flex-1 p-2 rounded border shadow-xl border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700"
            placeholder="Enter text to convert to speech"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="py-2 px-4 text-white bg-blue-500 rounded transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
}
