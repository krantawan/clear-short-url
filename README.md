# Simple URL Shortener

A simple and efficient URL shortener built with Next.js, Prisma, and PostgreSQL. This application allows users to shorten long URLs and track the number of clicks.

## Features

- Shorten long URLs
- Track the number of clicks on shortened URLs
- Persistent storage using PostgreSQL
- Simple and intuitive user interface

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL

## Getting Started

### Prerequisites

- Node.js and npm
- Docker and Docker Compose

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

2. Run the project
Use Docker Compose to build and start the project:
```sh
docker-compose up --build
```
The application will be available at http://localhost:3000.


### Services
- App: The Next.js application available at http://localhost:3000.
- Postgres: The PostgreSQL database.
- PgAdmin: A web-based PostgreSQL database administration tool available at http://localhost:5050.

### Project Structure

```sh
├── prisma              # Prisma schema and migration files
│   ├── migrations
│   └── schema.prisma
├── public              # Public assets
├── src
│   ├── pages           # Next.js pages
│   │   ├── api
│   │   │   ├── shorten.ts
│   │   │   └── clicks/[shortUrl].ts
│   │   ├── _app.tsx
│   │   └── index.tsx
│   ├── components      # Next.js components
│   │   ├── UrlForm.tsx
│   │   ├── UrlList.tsx
│   │   └── Shortened.tsx
│   └── styles          # Global styles
│       └── globals.css
├── .env.example        # Example environment variables
├── README.md
├── package.json
└── tsconfig.json
```

### Environment Variables
Make sure to set the following environment variables in your .env file:
```sh
DATABASE_URL="postgresql://admin:admin@postgres:5432/shorturl?schema=public"
NEXT_PUBLIC_URL="http://localhost:3000"
```

## Acknowledgements

 - [Next.js](https://nextjs.org/)
 - [Prisma](https://www.prisma.io/)
 - [Tailwind CSS](https://tailwindcss.com/)
 - [PostgreSQL](https://www.postgresql.org/)
