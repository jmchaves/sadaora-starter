# 🚀 Sadaora Starter App

A lightweight full-stack app that allows users to sign up, create/edit their profile, and view a public feed of other members. Built for the Sadaora Senior Full-Stack Engineer Assessment.

---

## 🔧 Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Auth:** JWT (JSON Web Tokens)
- **Database:** PostgreSQL (via Prisma ORM)
- **Styling:** Tailwind CSS (optional)
- **Bonus:** S3 (for image upload)

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/sadaora-starter.git
cd sadaora-starter
```

### 2. Setup the backend
```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```

### 3. Setup the frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## 📁 .env.example Template

```env
# PostgreSQL connection string (used by Prisma)
DATABASE_URL=postgres://postgres:postgres@db:5432/sadaora

# JWT secret for signing tokens
JWT_SECRET=your-super-secret-key

# S3 (optional for bonus stretch)
S3_BUCKET_NAME=your-bucket-name
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
```

---

## ✅ Features

### 🔐 Authentication
- Sign up / login with email and password
- Passwords hashed with `bcrypt`
- Sessions managed via JWT

### 👤 Profile Page
- Create, view, update, and delete your profile
- Fields: name, bio, headline, profile picture URL, interests (tags)

### 🌐 Public Feed
- View all profiles except your own
- Paginated for performance

### 🧪 Bonus
- Upload profile photo to cloud storage (S3 or mock endpoint)
- Option to deploy via Vercel (frontend) + Render (backend)
- Extra: Follow users or filter by tags

---

## 🧠 Architectural Decisions

1. **Modular Structure**:
   - Separated concerns clearly with dedicated folders for routes, controllers, and middleware to ensure maintainability and easy scaling.

2. **Prisma ORM**:
   - Chosen for its type safety, developer experience, and ease of migrations in a PostgreSQL setup.

3. **Authentication**:
   - JWT was used for stateless auth and simplicity, with tokens stored client-side for this demo. Secure cookies or refresh tokens can be added if needed.

---

## 🤔 Assumptions Made
- Only authenticated users can create or edit profiles.
- Public feed is open to all authenticated users.
- Image upload will use a mock S3 function unless environment config is provided.

---

## 🌐 Deployment
If deployed, the live app will be linked here:

**Frontend:** https://sadaora-frontend.vercel.app  
**Backend:** https://sadaora-backend.onrender.com

---

## 📬 Contact
Feel free to reach out via [your email] or open an issue.

---

Made with ❤️ for the Sadaora assessment.

