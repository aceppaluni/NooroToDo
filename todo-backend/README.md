# Backend – Task App API

This is the backend service for the **TodoApp**. It provides a REST API to manage tasks and uses **Prisma ORM** with a relational database (SQLite, PostgreSQL, or MySQL supported).

---

## 🚀 Tech Stack
- **Node.js** (Express.js)
- **Prisma ORM**
- **SQLite** (default, for local development)

---

## 📦 Installation

Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd backend
npm install
```

---

## ⚙️ Environment Setup

Create a `.env` file in the backend root:

```env
DATABASE_URL="file:./dev.db"
```

- By default, this uses **SQLite** (local file `dev.db`).

---

## 🛠️ Database Initialization (Prisma)

Run these steps the first time you set up the database:

1. **Generate Prisma Client**  
   ```bash
   npx prisma generate
   ```

2. **Push schema to the database**  
   (This creates tables based on your Prisma schema)  
   ```bash
   npx prisma db push
   ```


---

## ▶️ Running the Server

```bash
npm run dev
```

- The backend should start on **http://localhost:4000**

---

## 📚 API Endpoints

### Tasks
- `GET /tasks` → Get all tasks
- `POST /tasks` → Create a new task  
  Example body:
  ```json
  { "title": "My first task", "color": "blue" }
  ```
- `DELETE /tasks/:id` → Delete a task by ID

---