# Buffett Insights - Frontend UI

## Overview

This project is the React frontend for the Buffett Insights Financial Analyzer application. It provides a modern, dark-themed user interface built with Vite, React, and Tailwind CSS. Users can analyze financial data for stocks and interact with an AI chatbot powered by different backend models.

## Features

- **Homepage:** Clean landing page with navigation to the Dashboard and Chatbot sections.
- **Financial Dashboard:**
  - Input field to fetch data for any publicly traded stock symbol.
  - Displays key financial ratios based on Warren Buffett's principles.
  - Interactive tooltips explaining each ratio.
  - Displays annual Income Statement, Balance Sheet, and Cash Flow statements.
- **AI Chatbot:**
  - Real-time chat interface.
  - Toggle switch to select between two backend AI models:
    - **Gemini:** Uses Google's Gemini Pro, prompted to answer like Warren Buffett.
    - **Custom RAG:** Uses a backend RAG model (TF-IDF + T5) answering questions based on a custom corpus.
  - Displays user and bot messages with distinct styling and animations.
- **Styling:** Modern dark theme using Tailwind CSS, 'Inter' and 'Playfair Display' fonts, and purple/gold accent colors.

## Technology Stack

- React (v19 used during development)
- Vite (Frontend Tooling)
- Tailwind CSS (v3 used during development)
- `react-router-dom` (Routing)
- `axios` (API Requests)
- `@headlessui/react` (for accessible UI components like the toggle switch)
- `framer-motion` (for animations)
- `lucide-react` (for icons)
- Google Fonts: Inter, Playfair Display

## Prerequisites

- Node.js (LTS version strongly recommended - use `nvm` to manage versions)
- `npm` (comes with Node.js) or `yarn` (Install via `npm install -g yarn`)
- Git

## Setup Instructions

1.  **Clone the Repository**

    ```bash
    git clone [your-repo-url] # Replace with your repository URL
    cd buffet-ui
    ```

2.  **Set Node Version** (Recommended if using `nvm`)

    ```bash
    nvm use --lts
    # Or the specific LTS version you have installed, e.g., nvm use 20
    ```

3.  **Install Dependencies**

    - _Using npm:_
      ```bash
      npm install
      ```
    - _Using yarn:_
      ```bash
      yarn install
      ```

4.  **Ensure Backend is Running**

    - This frontend requires the `buffet-backend` API server to be running simultaneously.
    - Start the backend server first (see backend README). It typically runs at `http://127.0.0.1:8000/`.
    - Make sure the backend has CORS configured correctly to accept requests from the frontend's origin (default Vite port is usually `http://localhost:5173`).

5.  **Run the Development Server**
    - _Using npm:_
      ```bash
      npm run dev
      ```
    - _Using yarn:_
      `bash
yarn dev
`
      The application should now be running, typically at `http://localhost:5173/`.

## Project Structure

```text
buffet-ui/
├── public/
│ └── vite.svg
├── src/
│ ├── components/ <-- Reusable UI components (RatiosTable, StatementTable, etc.)
│ ├── hooks/ <-- Custom React hooks (useChat)
│ ├── pages/ <-- Page-level components (HomePage, StockDashboard, ChatbotPage)
│ ├── services/ <-- API service functions (chatbotService)
│ ├── App.jsx <-- Main application component with routing
│ ├── index.css <-- Tailwind directives and global styles
│ └── main.jsx <-- React application entry point
├── .eslintrc.cjs
├── .gitignore
├── index.html <-- HTML entry point (fonts linked here)
├── package.json
├── postcss.config.js <-- PostCSS configuration
├── tailwind.config.js <-- Tailwind CSS configuration
└── vite.config.js
```
