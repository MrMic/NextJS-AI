# GEMINI.md

## Project Overview

This is a Next.js web application built to demonstrate various AI functionalities using the Vercel AI SDK and an OpenAI provider. The project serves as a comprehensive showcase of modern AI capabilities, featuring a full-stack implementation with frontend UI pages corresponding to backend API routes for each feature.

## Key Technologies

*   **Framework:** Next.js
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **AI Integration:**
    *   Vercel AI SDK (`ai`, `@ai-sdk/react`)
    *   OpenAI Provider (`@ai-sdk/openai`)
*   **Schema Validation:** Zod

## Project Structure

The project follows a feature-based structure within the `src/app` directory. For each AI feature, there is:

1.  An **API Route** located in `src/app/api/{feature-name}/route.ts` that handles the server-side logic for interacting with the AI model.
2.  A **UI Page** located in `src/app/ui/{feature-name}/page.tsx` that provides a user interface to interact with the corresponding API.

The main entry point for the UI is `src/app/page.tsx`, but the core content seems to be organized under the `/ui` directory.

## Available Features

The application demonstrates the following AI capabilities:

*   **Chat:** A standard conversational AI interface.
*   **Completion:** Generates text completions.
*   **Image Generation:** Creates images from text prompts.
*   **Speech Generation:** Converts text to audible speech.
*   **Multi-Modal Chat:** A chat interface that can process multiple types of input (e.g., text and images).
*   **Streaming:** Streams responses from the AI model in real-time.
*   **Structured Data:** Extracts structured data from text, with examples for:
    *   `structured-data`: General structured objects.
    *   `structured-array`: Arrays of objects.
    *   `structured-enum`: Enums.
*   **Tools:** Demonstrates the AI's ability to use predefined functions or "tools".
*   **Audio Transcription:** Transcribes audio files into text.

## Building and Running

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the application.

3.  **Build for Production:**
    ```bash
    npm run build
    ```

4.  **Run in Production Mode:**
    ```bash
    npm run start
    ```

## Development Conventions

*   **Coding Style:** The project uses TypeScript for type safety. Code should adhere to the configurations in `tsconfig.json` and `eslint.config.mjs`.
*   **Linting:** Run `npm run lint` to check for code quality and style issues.
*   **Styling:** All styling is done using Tailwind CSS utility classes.
