"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

export default function ChatPage() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error, stop } = useChat();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="flex flex-col py-24 mx-auto w-full max-w-md stretch">
      {error && <div className="mb-4 text-red-500">{error.message}</div>}

      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          <div className="font-semibold">
            {message.role === "user" ? "You:" : "AI:"}
          </div>
          {message.parts.map((part, index) => {
            switch (part.type) {
              case "text":
                return (
                  <div
                    key={`${message.id}-${index}`}
                    className="whitespace-pre-wrap"
                  >
                    {part.text}
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      ))}
      {(status === "submitted" || status === "streaming") && (
        <div className="mb-4">
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full border-b-2 border-blue-400 animate-spin"></div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="fixed right-0 bottom-0 left-0 p-4 mx-auto w-full max-w-md border-t shadow-lg bg-zinc-50 border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800"
      >
        <div className="flex gap-2">
          <input
            className="flex-1 p-2 rounded border shadow-xl border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How can I help you?"
          />
          {status === "submitted" || status === "streaming" ? (
            <button
              onClick={stop}
              className="py-2 px-4 text-white bg-red-500 rounded transition-colors hover:bg-red-600"
            >
              Stop
            </button>
          ) : (
            <button
              type="submit"
              className="py-2 px-4 text-white bg-blue-500 rounded transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={status !== "ready"}
            >
              Send
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
