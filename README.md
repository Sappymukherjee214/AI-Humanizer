# 🌤️ Weather Forecast App
 
![GSSoC 2026](https://img.shields.io/badge/GSSoC-2026-orange?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-Vite-blue?style=for-the-badge&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-316192?style=for-the-badge&logo=postgresql)
![Redis](https://img.shields.io/badge/Redis-Caching-red?style=for-the-badge&logo=redis)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)
 
A full-stack weather forecast application with real-time weather data, saved locations, email alerts, and Redis caching — built with the MERN stack + PostgreSQL.
 
---
 
## 📸 Screenshots
 
> _Screenshots coming soon — contributors can help add them!_
 
---
 
## ✨ Features
 
- 🔐 User authentication with JWT (register & login)
- 🌡️ Real-time current weather data
- 📅 5-day weather forecast
- 📍 Save favourite locations
- 🔔 Weather alerts with email notifications
- ⚡ Redis caching with 20-minute TTL
- ⏰ Automated email alerts via cron job (runs every 30 mins)
- 🐳 Docker support for easy local setup
---
 
## 🛠️ Tech Stack
 
### Backend
- Node.js + Express.js
- PostgreSQL + Prisma ORM
- Redis
- JWT + bcrypt
- Nodemailer
- node-cron
- Docker
### Frontend
- React.js + Vite
- Tailwind CSS
- Zustand (state management)
- Axios
- React Router v6
---
 
## 📁 Project Structure
 
```
weather-forecast-app/
├── server/
│   ├── config/
│   │   ├── db.js
│   │   └── redis.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── weather.controller.js
│   │   ├── location.controller.js
│   │   └── alert.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── weather.routes.js
│   │   ├── location.routes.js
│   │   └── alert.routes.js
│   ├── services/
│   │   ├── weather.service.js
│   │   ├── email.service.js
│   │   └── cron.service.js
│   ├── prisma/
│   │   └── schema.prisma
│   └── index.js
├── client/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── WeatherCard.jsx
│       │   ├── ForecastCard.jsx
│       │   └── LocationCard.jsx
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   └── Dashboard.jsx
│       ├── services/
│       │   └── api.js
│       └── store/
│           └── authStore.js
├── docker-compose.yml
└── README.md
```
 
---
 
## 🗄️ Database Schema
 
```
User
├── id
├── name
├── email (unique)
├── password (hashed)
├── createdAt
├── locations []
└── alerts []
 
Location
├── id
├── city
├── latitude
├── longitude
├── userId (foreign key)
└── createdAt
 
Alert
├── id
├── city
├── alertType
├── isActive
├── userId (foreign key)
└── createdAt
```
 
---
 
## 📡 API Endpoints
 
### Auth
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login and receive JWT token | No |
 
### Weather
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/weather/current?city=Mumbai` | Get current weather | No |
| GET | `/api/weather/forecast?city=Mumbai` | Get 5-day forecast | No |
 
### Locations
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/locations` | Get all saved locations with weather | Yes |
| POST | `/api/locations` | Save a new location | Yes |
| DELETE | `/api/locations/:id` | Delete a saved location | Yes |
 
### Alerts
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/alerts` | Get all alerts | Yes |
| POST | `/api/alerts` | Create a weather alert | Yes |
| DELETE | `/api/alerts/:id` | Delete an alert | Yes |
 
---
 
## ⚙️ Setup and Installation
 
### Prerequisites
- Node.js v18 or higher
- Docker Desktop
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org))
- Gmail account with App Password enabled
### 1. Clone the repository
```bash
git clone https://github.com/riya-dumbare/Weather-Forecast.git
cd Weather-Forecast
```
 
### 2. Setup backend
```bash
cd server
npm install
cp .env.example .env
```
 
Fill in your `.env` file:
```env
PORT=5000
DATABASE_URL=postgresql://weather_user:weather_pass@localhost:5432/weather_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_long_random_secret
WEATHER_API_KEY=your_openweathermap_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```
 
### 3. Start PostgreSQL and Redis with Docker
```bash
docker-compose up -d
```
 
### 4. Run database migrations
```bash
cd server
npx prisma migrate dev
```
 
### 5. Start the backend server
```bash
npm run dev
```
 
### 6. Setup and start the frontend
```bash
cd client
npm install
npm run dev
```
 
### 7. Open the app
```
Frontend  →  http://localhost:5173
Backend   →  http://localhost:5000
```
 
---
 
## ⚡ How Caching Works
 
Every weather request checks Redis first before calling the OpenWeatherMap API.
 
```
Request comes in for city "Mumbai"
        |
Check Redis cache
        |
   Found? ──── Yes ──── Return cached data (source: cache)
        |
        No
        |
Call OpenWeatherMap API
        |
Save response in Redis with 20 min TTL
        |
Return data to user (source: api)
```
 
---
 
## 🔔 How Weather Alerts Work
 
A cron job runs every 30 minutes and checks all active alerts against current weather conditions.
 
```
Cron job runs every 30 minutes
        |
Fetch all active alerts from database
        |
For each alert → get current weather for that city
        |
Does weather match the alert type?
        |
   Yes ──── Send email notification to user
        |
   No  ──── Do nothing, check again in 30 minutes
```
 
**Supported alert types:**
| Alert Type | Triggers On |
|------------|-------------|
| `rain` | Rain, Drizzle, Thunderstorm |
| `storm` | Thunderstorm, Tornado |
| `snow` | Snow |
| `heat` | Temperature > 40°C |
| `fog` | Fog, Mist, Haze |
 
---
 
## 🔐 Authentication Flow
 
```
Register:
User sends name, email, password
→ Password hashed with bcrypt (10 salt rounds)
→ User saved to PostgreSQL
→ Success response
 
Login:
User sends email, password
→ Find user by email
→ Compare password with stored hash
→ Generate JWT token (expires in 7 days)
→ Return token to client
 
Protected Routes:
Request arrives with Authorization: Bearer <token>
→ Middleware verifies token using JWT_SECRET
→ Attach user info to req.user
→ Allow request to proceed
```
 
---
 
## 🤝 Contributing
 
We welcome contributions from everyone! This project is part of **GSSoC 2026**.
 
To get started:
1. Check the [open issues](https://github.com/riya-dumbare/Weather-Forecast/issues) — look for `good-first-issue` or `easy` labels
2. Read the [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines
3. Fork the repo, make your changes, and open a Pull Request
Whether it's fixing a bug, improving UI, adding a new feature, or improving docs — all contributions are welcome! 🙌
 
---
 
## 📄 License
 
This project is licensed under the [MIT License](./LICENSE).
 
---
 
## 👩‍💻 Author
 
Built by [Riya Dumbare](https://github.com/riya-dumbare) as a full-stack learning project covering backend APIs, databases, caching, authentication, scheduled jobs, and React frontend development.
 
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/riya-dumbare)