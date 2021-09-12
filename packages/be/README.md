# BIDDLY BACKEND

## Getting started for local dev

### 1. Install dependencies and set enviroment

```bash
npm install
```

Check `.env.sample` and create your own `.env`

### 2. Start the server

```bash
npm run dev
```

The server is now running on `http://localhost:3000`. You can now the API requests, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

## Evolving the app

Evolving the application typically requires two steps:

1. Migrate your database using Prisma Migrate
2. Update your application code
