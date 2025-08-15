"use client";

import { useState, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Image from "next/image";

export default function MultiModalChatPage() {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<FileList | undefined>(undefined);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/multi-modal-chat",
    }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input, files: files });
    setInput("");
    setFiles(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };

  return (
    <div className="flex flex-col pt-12 pb-36 mx-auto w-full max-w-md stretch">
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
              case "file":
                if (part.mediaType.startsWith("image/")) {
                  return (
                    <Image
                      key={`${message.id}-${index}`}
                      src={part.url}
                      alt={part.filename ?? `attachment-${index}`}
                      width={500}
                      height={500}
                      className="my-2 rounded shadow-lg"
                    />
                  );
                }
                if (part.mediaType.startsWith("application/pdf")) {
                  return (
                    <iframe
                      key={`${message.id}-${index}`}
                      src={part.url}
                      width={500}
                      height={500}
                      title={part.filename ?? `attachment-${index}`}
                    />
                  );
                }
                return null;
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
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <label
              htmlFor="file-upload"
              className="flex gap-2 items-center text-sm cursor-pointer text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200 hover:text-zinc-800"
            >
              {/* Icon & text will go here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
              </svg>
              {files?.length
                ? `${files.length} file(s) attached`
                : "Attach files"}
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(event) => {
                if (event.target.files) {
                  setFiles(event.target.files);
                }
              }}
              multiple
              ref={fileInputRef}
            />
          </div>
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
        </div>
      </form>
    </div>
  );
}
