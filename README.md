# CollabForms

**CollabForms** is a modern, real-time collaborative form builder and responder.  
Built for teams, classrooms, and anyone who wants to collect and manage data together—live!

---

## 🚀 Features

- Live collaborative form editing with field locking
- Real-time presence: see who’s online and editing
- Admin dashboard with form creation and analytics
- Invite code system for easy form sharing
- Secure authentication (JWT)
- Beautiful purple-themed, responsive UI
- Animated transitions and modern design
- Role-based access (admin/user)
- Socket.io-powered real-time updates
- Dashboard analytics and activity counters

---

## 🛠️ Tech Stack

- **Frontend:** React, Material-UI, Framer Motion, Axios, Socket.io-client
- **Backend:** Node.js, Express, PostgreSQL, Sequelize, Socket.io, Redis
- **Authentication:** JWT
- **Deployment:** Vercel, Netlify, or your own server

---

## 📦 Getting Started

### 1. Clone the repository

git clone https://github.com/XENDERBLASTERX/BackendProjC.git
cd BackendProjC

text

### 2. Install dependencies

#### Frontend

cd frontend
npm install

text

#### Backend

cd backend
npm install

text

---

## 🗄️ Database Setup

### 1. Create the PostgreSQL database and users table

Open your terminal and start the PostgreSQL shell:

psql -U postgres

text

Then run these commands (copy-paste each block):

-- Create database
CREATE DATABASE collabforms_db;

text
undefined
-- Connect to the database
\c collabforms_db;

text
undefined
-- Create users table
CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
username VARCHAR(50) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
role VARCHAR(20) NOT NULL DEFAULT 'user',
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optional: create an index on username for faster lookups
CREATE INDEX idx_users_username ON users(username);

text

---

### 3. Set up environment variables

Copy `.env.example` to `.env` in the backend folder and fill in your values:

PORT=4000
DATABASE_URL=postgres://user:password@localhost:5432/collabforms_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret

text

---

### 4. Run the app

#### Backend

cd backend
npm start

text

#### Frontend

cd frontend
npm start

text

### 5. Open in your browser

http://localhost:3000

text

---

## 📝 API Usage (Sample Endpoints)

> You can use these in Postman or any HTTP client.

### Register

POST /auth/register
Content-Type: application/json

{
"username": "testuser",
"password": "testpass",
"role": "user"
}

text

### Login

POST /auth/login
Content-Type: application/json

{
"username": "testuser",
"password": "testpass"
}

text

### Create Form (Admin)

POST /form/create
Authorization: Bearer <token>
Content-Type: application/json

{
"title": "Demo Form",
"fields": [
{ "label": "Name", "type": "text" },
{ "label": "Age", "type": "number" },
{ "label": "Gender", "type": "dropdown", "options": ["Male", "Female", "Other"] }
]
}

text

### Join Form by Code

GET /form/code/<invite_code>

text

### Submit Form Response

POST /form/<form_id>/submit
Authorization: Bearer <token>
Content-Type: application/json

{
"data": {
"Name": "Alice",
"Age": 25,
"Gender": "Female"
}
}

text

---

## 📊 Dashboard Analytics & Enhancements

- Animated counters for forms and responses
- Charts for response trends (add with Chart.js, Recharts, or Victory)
- Live presence and activity logs
- More features coming soon!
---

> Made with 💜 by [Your Name](https://github.com/XENDERBLASTERX)
