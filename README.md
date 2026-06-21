# 📝 NoteFlow - Full Stack Note Management Platform

A modern full-stack note management application built with **React, Node.js, Express, and MongoDB**.

NoteFlow allows users to securely create, update, delete, and manage their personal notes while providing administrators with a powerful dashboard to monitor users and manage application data.

The project focuses on implementing real-world backend concepts such as authentication, authorization, role-based access control, REST APIs, database management, and admin operations.

---

# 🚀 Features

## 👨‍💻 User Features

### Authentication
- User registration
- Secure login system
- JWT based authentication
- HTTP-only cookie authentication
- Password hashing using bcrypt

### Notes Management
- Create notes
- View personal notes
- Update notes
- Delete notes
- Notes are linked with individual users
- Automatic date tracking

### User Experience
- Clean and responsive UI
- Protected routes
- Dynamic note rendering
- Search-ready note architecture


---

# 🛡️ Admin Features

A separate admin system provides complete application management.

### Admin Dashboard

- View total registered users
- View total notes
- Monitor application activity


### User Management

- View all users
- Access user-specific notes
- Delete users
- Manage user content


### Note Management

- View any user's notes
- Update notes
- Delete notes
- Administrative control over platform data


---

# 🏗️ Application Architecture

```
                 Client
                  |
                  |
              React.js
                  |
                  |
              REST APIs
                  |
                  |
          Node.js + Express
                  |
                  |
             MongoDB Atlas
```


---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- CSS
- Fetch API
- Vite


## Backend

- Node.js
- Express.js
- Mongoose
- JWT
- bcrypt.js
- Cookie Parser


## Database

- MongoDB Atlas


---

# 📂 Project Structure

```
NoteFlow

│
├── frontend
│   │
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── main.jsx
│
│
├── backend
│   │
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │
│   ├── middleware
│   │   └── verifyToken.js
│   │
│   ├── models
│   │
│   ├── routes
│   │
│   └── index.js
│
└── README.md
```

---

# 🔐 Authentication Flow

The application uses JWT authentication with secure cookies.

Flow:

```
User Login
      |
      |
Password verification (bcrypt)
      |
      |
JWT Token Generation
      |
      |
HTTP-only Cookie Storage
      |
      |
Protected API Access
```

---

# 🔑 Authorization System

The application implements role-based access control.

Users contain roles:

```
user
admin
```

Admin-only operations are protected using role verification.

Example:

```
User
 |
 |---- Create own notes
 |
 |---- Manage own data


Admin
 |
 |---- Manage users
 |
 |---- Manage all notes
 |
 |---- Control application data
```

---

# 🌐 API Endpoints

## Authentication

### Register User

```
POST /register
```

### Login User

```
POST /login
```

---

## Notes

### Create Note

```
POST /add
```

### Get User Notes

```
GET /list
```

### Update Note

```
PUT /update/:id
```

### Delete Note

```
DELETE /delete/:id
```

---

## Admin APIs

### Dashboard Statistics

```
GET /admin/stats
```


### Get Users

```
GET /admin/users
```


### Get User Notes

```
GET /user-notes/:id
```


### Delete User Notes

```
DELETE /admin/delete-user-notes/:id
```


### Update User Notes

```
PUT /admin/update-user-note/:id
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone <repository-url>
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm run dev
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

---

# 📸 Screenshots

Add screenshots here:

- Login Page
- User Dashboard
- Notes Page
- Admin Dashboard

---

# 🔮 Future Improvements

## AI Features

- AI note summarizer
- AI chatbot assistant
- Smart note search
- Automatic categorization


## SaaS Features

- Subscription plans
- Payment integration
- Team workspaces
- Organization accounts
- Usage limits


## Platform Improvements

- Real-time collaboration
- File uploads
- Cloud storage
- Email notifications
- Advanced analytics
- Activity tracking

---

# 🧠 Concepts Implemented

This project helped implement:

✅ REST API development  
✅ MVC backend structure  
✅ MongoDB database design  
✅ Mongoose ODM  
✅ JWT authentication  
✅ Cookie-based sessions  
✅ Password hashing  
✅ Middleware  
✅ Protected routes  
✅ Role-based authorization  
✅ CRUD operations  
✅ Admin dashboards  
✅ Full-stack deployment workflow  


---

# 👨‍💻 Developer

**Vedant**

Full Stack Developer

---

# ⭐ Project Status

Currently under active development.

Future versions will transform this project into a complete SaaS productivity platform.
