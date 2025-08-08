import Image from "next/image";

export default function Home() {
  return (
    <div className="grid gap-16 justify-items-center items-center p-8 pb-20 min-h-screen font-sans sm:p-20 grid-rows-[20px_1fr_20px]">
      <main className="flex flex-col row-start-2 items-center sm:items-start gap-[32px]">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-decimal list-inside text-center sm:text-left text-sm/6">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="py-0.5 px-1 font-mono font-semibold rounded bg-black/[.05] dark:bg-white/[.06]">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex flex-col gap-4 items-center sm:flex-row">
          <a
            className="flex gap-2 justify-center items-center px-4 h-10 text-sm font-medium rounded-full border border-transparent border-solid transition-colors sm:px-5 sm:w-auto sm:h-12 sm:text-base bg-foreground text-background dark:hover:bg-[#ccc] hover:bg-[#383838]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="flex justify-center items-center px-4 w-full h-10 text-sm font-medium rounded-full border border-solid transition-colors sm:px-5 sm:w-auto sm:h-12 sm:text-base hover:border-transparent border-black/[.08] md:w-[158px] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] hover:bg-[#f2f2f2]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="flex flex-wrap row-start-3 justify-center items-center gap-[24px]">
        <a
          className="flex gap-2 items-center hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex gap-2 items-center hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex gap-2 items-center hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
