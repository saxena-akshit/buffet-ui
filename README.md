# Buffett Insights - Frontend UI

This project is the React frontend for the Buffett Insights Financial Analyzer application. It provides a user interface to interact with the backend API, allowing users to view financial statements and key Warren Buffett ratios for public companies. It also includes a placeholder for a future AI chatbot feature.

## Prerequisites

- Node.js (LTS version recommended - Use `nvm` to manage versions)
- npm (comes with Node.js) or yarn (Install via `npm install -g yarn`)

## Setup Instructions

1.  **Clone the Repository** (if applicable)

    ```bash
    git clone [your-repo-url]
    cd [your-repo-name]/ui
    ```

2.  **Set Node Version** (if using `nvm`)

    ```bash
    nvm use --lts
    # Or use the specific LTS version you installed, e.g., nvm use 20
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
    The frontend requires the Django backend API to be running (typically at `http://127.0.0.1:8000/`) and correctly configured for CORS to allow requests from the frontend's origin (e.g., `http://localhost:5173`).

5.  **Run the Development Server**
    - _Using npm:_
      ```bash
      npm run dev
      ```
    - _Using yarn:_
      `bash
yarn dev
`
      The application will typically be available at `http://localhost:5173/`.

## Features

- Homepage with navigation to Dashboard and placeholder Chatbot sections.
- Stock Dashboard page with input for stock symbols.
- Fetches and displays key Warren Buffett financial ratios with explanations via tooltips.
- Fetches and displays annual Income Statement, Balance Sheet, and Cash Flow statements.
- Modern dark theme UI with purple and gold accents.

## Technology Stack

- React (v19 used during development)
- Vite (Build tool)
- Tailwind CSS (v3 used during development)
- React Router DOM (for navigation)
- Axios (for API calls)
- Poppins Google Font

```

```
