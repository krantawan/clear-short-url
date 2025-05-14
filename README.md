# Simple URL Shortener

A simple and efficient URL shortener built with Next.js, Prisma, and PostgreSQL. This application allows users to shorten long URLs and track the number of clicks.

---
![Banner](https://raw.githubusercontent.com/krantawan/clear-short-url/master/banner.png)  
> 🖼️ รูปภาพประกอบสร้างด้วยปัญญาประดิษฐ์ (AI) เพื่อการนำเสนอ
---
## ✅ Features

- Shorten long URLs
- Track the number of clicks on shortened URLs
- Persistent storage using PostgreSQL
- Simple and intuitive user interface

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL

## Preview
![Preview](https://raw.githubusercontent.com/krantawan/clear-short-url/master/example.png) 
---
## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Docker and Docker Compose

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
npm install
```

2. Run the project
Use Docker Compose to build and start the project:
```sh
docker-compose up --build
```
The application will be available at http://localhost:3000.

3. Run Prisma Migrate
```sh
npx prisma migrate dev --name init
```

### Services
- App: The Next.js application available at http://localhost:3000.
- Postgres: The PostgreSQL database.
- PgAdmin: A web-based PostgreSQL database administration tool available at http://localhost:5050.

### 📂 Project Structure

| File                        | Description                                       |
| --------------------------- | ------------------------------------------------- |
| `pages/api/shorten.ts`      | API route for creating shortened URLs             |
| `pages/api/[slug].ts`       | Redirects to the original URL based on slug       |
| `pages/api/stats/[slug].ts` | Returns statistics (click count) for a given slug |
| `prisma/schema.prisma`      | Database schema definition                        |




### Environment Variables
Make sure to set the following environment variables in your .env file:
```sh
DATABASE_URL="postgresql://admin:admin@postgres:5432/shorturl?schema=public"
NEXT_PUBLIC_URL="http://localhost:3000"
```

## 📚 Acknowledgements

 - [Next.js](https://nextjs.org/)
 - [Prisma](https://www.prisma.io/)
 - [Tailwind CSS](https://tailwindcss.com/)
 - [PostgreSQL](https://www.postgresql.org/)

---
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U6U21EYMRR)
