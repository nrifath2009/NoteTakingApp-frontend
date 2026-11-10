# NoteTakingApp Frontend

React and TypeScript client built with Vite.

## Requirements

- Node.js 20 or newer
- npm
- The NoteTakingApp API running locally or a reachable API URL

## Setup

```powershell
npm ci
Copy-Item .env.example .env
```

Set `VITE_API_URL` in `.env` to the API base URL. The local default is `http://localhost:5000/api`.

## Commands

```bash
npm run dev
npm run build
npm run lint
```

Vite serves the development app at `http://localhost:5173` by default.
