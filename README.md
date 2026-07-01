# 🐦 Fullstack Twitter Clone

A modern, responsive fullstack Twitter (X) clone built with a **Next.js 15 / React 19** frontend and an **Express / MongoDB** backend.

---

## 🚀 Features

- 🔑 **User Authentication**: Secure signup and login using **Passport.js (JWT strategy)** and password hashing with **bcrypt**.
- 📝 **Tweets**: Create tweets (with a 250-character limit), view detailed tweet pages, and list tweets in a feed.
- 💬 **Comments**: Interactive comment section for tweets to engage in discussion.
- ❤️ **Likes**: Toggle likes on both tweets and comments dynamically.
- 📱 **Responsive UI**: Sleek sidebar navigation for desktop and bottom navigation bar for mobile viewports.
- 🎨 **Modern Design**: Built with Tailwind CSS, Radix UI primitives (via shadcn/ui components), Framer Motion transitions, and Lucide icons.
- 🛡️ **Health checks**: Native endpoints and client UI indicators checking API & database status.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router, Turbopack) & React 19
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Framework**: Node.js & Express
- **Database ODM**: Mongoose
- **Authentication**: Passport.js & Passport JWT
- **File Uploads**: Multer & Multer-S3 (configured for AWS S3)
- **Dev Tooling**: Nodemon & Babel
- **Testing**: Jest

### Database & DevOps
- **Database**: MongoDB (v7.0)
- **Containerization**: Docker (for running MongoDB locally)

---

## 📦 Directory Structure

```text
├── client/                 # Next.js frontend application
│   ├── app/                # Pages and layouts (Home, Profile, Notifications, etc.)
│   ├── components/         # Reusable UI components (Tweet Card, Composer, Navigation)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # API client utilities and authentication contexts
│   └── public/             # Static assets
└── server/                 # Express backend application
    ├── src/
    │   ├── config/         # DB connection, JWT strategy, S3 upload configurations
    │   ├── controllers/    # Express controllers (Auth, Tweet, Like, Comment)
    │   ├── middleware/     # Authentication middleware
    │   ├── models/         # Mongoose Schemas (User, Tweet, Comment, Like, Hashtag)
    │   ├── repository/     # Data access layer / repository pattern
    │   ├── routes/         # API endpoint routers
    │   └── services/       # Business logic layer
    └── tests/              # Test suites using Jest
```

---

## ⚙️ Getting Started

Follow the steps below to set up and run the application locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [Docker](https://www.docker.com/) (to run MongoDB)

---

### 1. Database Setup (MongoDB via Docker)

Run the following command to start a MongoDB instance in a Docker container:

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=adminpassword \
  -v mongo-data:/data/db \
  mongo:7.0
```

---

### 2. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` configuration file from the sample:
   ```bash
   cp .env.sample .env
   ```

4. Verify your `.env` environment variables match your setup:
   - `PORT=8080`
   - `JWT_SECRET=secret`
   - `MONGODB_URL=mongodb://admin:adminpassword@localhost:27017/admin`

5. Start the backend server in development mode:
   ```bash
   npm start
   ```
   *The API will run at [http://localhost:8080](http://localhost:8080).*

6. Run the backend tests:
   ```bash
   npm test
   ```

---

### 3. Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd ../client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server (with Turbopack support):
   ```bash
   npm run dev
   ```
   *Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.*

---

## 🔌 API Reference

The backend exposes the following API endpoints under the `/api/v1` base path:

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| **POST** | `/api/v1/signup` | Register a new user | ❌ No |
| **POST** | `/api/v1/login` | Log in a user & retrieve JWT token | ❌ No |
| **POST** | `/api/v1/tweet` | Create a new tweet (optionally with an image) | ✅ Yes |
| **GET** | `/api/v1/tweet/:id` | Retrieve details of a specific tweet | ❌ No |
| **POST** | `/api/v1/comment` | Add a comment to a tweet | ✅ Yes |
| **POST** | `/api/v1/likes/toggle` | Toggle like status on a tweet or comment | ✅ Yes |
| **GET** | `/health` | Check API and database health status | ❌ No |

> For more detailed schema parameters and query options, view the backend [api.md](file:///home/jaison/code/projects/twitter/server/api.md).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit pull requests.