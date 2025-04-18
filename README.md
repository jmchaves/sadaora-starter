# Sadaora Starter App

This is a full-stack starter project built with:

- **Frontend**: Next.js (TypeScript, Tailwind CSS, Zod)
- **Backend**: Node.js (Express, TypeScript, Prisma)
- **Database**: PostgreSQL (via Docker)
- **Storage**: AWS S3 for image uploads

---

## 📁 Project Structure

```
├── backend/              # Express backend with Prisma
├── frontend/             # Next.js frontend
├── docker-compose.yml    # Docker services for frontend, backend and DB
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/jmchaves/sadaora-starter.git
cd sadaora-starter
```

### 2. Setup environment variables

Rename `.env.example` to `.env.local` and replace with:

[Open access to keys](https://docs.google.com/document/d/1ildTwjn5tYqewc9GUYIZDCc7hebDqt3yM7ygo3u-vgo/edit?usp=drive_link)

---

## 🐳 Running with Docker

Start the frontend, backend and database:

```bash
docker compose up --build
```

This will:
- Start a PostgreSQL database
- Start the backend on port `4000`
- App will be available at [http://localhost:3000](http://localhost:3000)
> ⚠️ Docker will take time to install and run all the services. Please make sure the backend is running before you access to the frontend.
---

## 💻 Credentials for two users

```bash
email address: john@example.com or luisa@example.com
pass: password123
```

---

## ✅ Features

- JWT Authentication
- Profile editing
- Avatar upload to AWS S3
- Follow/unfollow other users
- Responsive UI with Tailwind
- Zod for form validation

---

## 🧪 Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Zod
- **Backend**: Express, Prisma, JWT
- **Database**: PostgreSQL
- **Cloud**: AWS S3

---

### 📊 Startup Environment Justification

In a startup setting, speed, clarity, and scalability are crucial. My choices reflect these values:

- **Monorepo Structure**: Keeping frontend and backend in the same repository simplifies onboarding and aligns with the lean nature of startups—developers can move quickly without managing multiple repos.

- **Docker for Local Dev**: Docker ensures environment consistency across all machines, so new team members can spin up the app in one command—this removes friction and accelerates iteration.

- **Prisma ORM + PostgreSQL**: Prisma provides rapid development with type safety and intuitive syntax, while PostgreSQL offers a battle-tested, scalable solution fit for production workloads.

- **JWT Authentication**: Lightweight and scalable, JWT tokens allow the backend to stay stateless—perfect for future horizontal scaling without needing session stores.

- **S3 Photo Uploads**: Offloading image storage to AWS S3 keeps the app performant and lets us focus on core features, not managing binary files on our server.

---

## 🛠️ Future Improvements

- **Component Unit Tests**: Add Jest or Vitest tests for frontend components and backend routes to ensure robustness.
- **CI/CD Integration**: Set up GitHub Actions for automatic testing and deployment.
- **Better Error Handling**: Centralize error management in backend to return consistent API responses.
- **API Rate Limiting**: Add rate limiting (e.g., using `express-rate-limit`) for security.
