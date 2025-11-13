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
  
**Containerization:**
- 🪣 Docker

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


## 🧰 Getting Started with Containerization (Docker)

This project uses **Docker** and **Docker Compose** to containerize the entire Support Desk application — including the **Laravel backend**, **React frontend**, and **MongoDB database** — for a consistent, production-like development environment.

### ⚙️ Prerequisites
Make sure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

You can verify your setup by running:
```bash
docker --version
docker compose version
```

### 🧩 Environment Overview
The compose.yaml file defines three main services:

- backend → Node API container (Node.js runtime)
- frontend → React build served via Nginx
- db → MongoDB service with a production-level application user automatically created via mongo-init.js in the project root.

To use the root user instead, remove the second volume entry (for mongo-init.js) in the db service.
Then, update the connection string to use the MONGO_INITDB_ROOT_USER and MONGO_INITDB_ROOT_PASSWORD environment variables instead of app_user and app_password:

mongodb://app_user:app_password@db:27017/support_desk?authSource=support_desk

Replace authSource=support_desk with authSource=admin wherever this string is used — including the backend’s MONGO_URL environment variable.


These services are connected through a shared bridge network called supportdesk-network.

### 🚀 Running the App
From the root of the project, run:
docker compose up --build

This will:

- Build images for both backend and frontend.
- Create and start the MongoDB service.
- Launch all containers and expose the following ports:


- *Frontend: http://localhost:3000*
- *Backend API: http://localhost:5000*
- *MongoDB: localhost:27017 (internal network access only)*


Once up, your app should be accessible via the browser at:
http://localhost:3000

### 🔄 Live Code Updates (Optional)
To enable hot-reloading during development, the Compose file includes the develop specification to watch certain directories and sync changes into running containers:
develop:
  watch:
    - action: sync
      path: .
      target: /app
      ignore:
        - node_modules/
        - dist/


**📝 You can exclude folders like node_modules, vendor, or build directories to prevent unnecessary reloads.**

### 🧰 Common Commands
- Stop all running containers:
docker compose down

- Rebuild and restart containers after code changes:
docker compose up --build

- Live Code Updates:
docker compose build --watch

- View logs for a specific service:
docker compose logs backend

- Open a shell inside a container:
docker exec -it supportdesk-backend sh


### 🛠️ Database GUI Access

You can connect to the MongoDB container using tools like MongoDB Compass or Atlas CLI.
- Host: localhost
- Port: 27017
- Username/Password: as configured in your .env or docker-compose.yml.


### 🧱 Production Notes

For production builds:
- Use npm run build to generate optimized frontend assets.
- Serve the React build from an Nginx static block.
- Disable watch mode and mount volumes as read-only for better security.


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
│   ├── server.js
│   ├── dockerfile
│   ├── .env.example
│   └── package.json
│
├── frontend/            # React + Redux + Tailwind
│   ├── public       
│   ├── src/
│   │   ├── features/
│   │   ├── components/
│   │   ├── pages/
│   │   └── store.js
│   ├── package.json
│   ├── dockerfile
│   ├── nginx.conf
│   ├── .env.example
│   └── vite.config.js
│
├── compose.yaml
├── mongo-init.js
└── README.md
```