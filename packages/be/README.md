# BIDDLY BACKEND

## Getting started for local dev

### 1. Install dependencies and enviroment

```bash
npm install
```

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```bash
npx prisma migrate dev --name init
```

Now, seed the database with the sample data in [`prisma/seed.ts`](./prisma/seed.ts) by running the following command:

```bash
npx prisma db seed --preview-feature
```

### 3. Start the server

```bash
npm run dev
```

The server is now running on `http://localhost:3000`. You can now the API requests, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

## Evolving the app

Evolving the application typically requires two steps:

1. Migrate your database using Prisma Migrate
2. Update your application code
