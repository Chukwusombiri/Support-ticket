# 🧾 Support Ticket System (MERN Stack)

**Live Demo:** [https://support-ticket-frontend-lc5s.onrender.com](https://support-ticket-frontend-lc5s.onrender.com)

A full-stack ticketing application that demonstrates a real-world workflow of modern support systems — from issue creation to management and resolution.  
Built with the **MERN stack** and designed to highlight best practices in authentication, API design, and global state management.

---

## ⚙️ Tech Stack

**Frontend:**
- ⚛️ ReactJS (Vite)
- 🎨 TailwindCSS
- 🗃️ Redux Toolkit (for complex global state)
- 🔔 React Toastify
- 🧩 clsx for conditional class handling

**Backend:**
- 🚀 Node.js + Express.js
- 🛢️ MongoDB + Mongoose
- 🔐 Authentication & Authorization with bcrypt + JWT
- ✅ Data validation using Joi + Mongoose schema rules
- ⚠️ Centralized error handling middleware
- 🧰 Additional utils and middlewares for logging & security

---

## ✨ Core Features

### 🔑 Authentication & Authorization
- Secure authentication with **bcrypt** for password hashing and **JWT** for token-based sessions.
- Authenticated users can:
  - Create new support tickets.
  - Edit or delete their own tickets.
  - Add comments to ongoing tickets.

### 🧾 Ticket Management
- CRUD functionality for tickets.
- Role-based restrictions ensuring users manage only their own tickets.
- Comments and ticket updates tracked seamlessly.

### 🧱 Validation & Error Handling
- Input validation using **Joi** and **Mongoose schema validations**.
- Structured API error responses handled via centralized middleware.

### 🧩 State Management
- **Redux Toolkit** manages complex UI and authentication state across the SPA.
- Persistent login state across sessions.

---

## 🧠 Highlights
- Proper separation of concerns between frontend and backend.
- RESTful API design that can be reused by mobile or desktop clients.
- Deployed on **Render** with independent services for backend and frontend.
- Realistic simulation of a SaaS-style ticketing workflow.

---

## 🧰 Getting Started (Local Setup)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Chukwusombiri/Support-ticket.git
```

### 2️⃣ Setup environment files
```bash
cp .env.example .env
cd frontend
cp .env.example .env
```

Replace all variables with your own values (MongoDB URI, JWT secret, etc.)


### 3️⃣ Install dependencies
__For backend (root directory):__
```bash
npm install
```

__For frontend:__
```bash
cd frontend
npm install
```

### 4️⃣ Run the app in development mode
 - __Option 1 — Run both frontend & backend concurrently:__
```bash
npm run dev
```

- __Option 2 — Run separately in different terminals:__
 - Backend 
```bash
npm run server
```
 - Frontend
```bash
cd frontend
npm run dev
```

## 🏗️ Project Architecture
```bash
Support-ticket/
│
├── backend/              # Express.js + Mongoose + Joi validation
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── frontend/            # React + Redux + Tailwind
│   ├── public       
│   ├── src/
│   │   ├── features/
│   │   ├── components/
│   │   ├── pages/
│   │   └── store.js
│   ├──package.json
│   └── vite.config.js
│
├── .env.example
├── package.json
└── README.md
```