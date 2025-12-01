<h1 align="center">💸 Wallet — Expense Tracker</h1>

![Demo App](./mobile/assets/images/screenshot-for-readme.png)

---

## 🎯 Overview

A simple full‑stack wallet app:

* React Native (Expo) mobile app
* Express backend API
* Clerk authentication
* PostgreSQL (Neon)
* Redis rate‑limiting

---

## 🗂 Project Structure

```
project/
├── backend/
├── mobile/
└── README.md
```

---

## ⚙️ Environment

### Backend (`/backend/.env`)

```
PORT=""
DATABASE_URL=...
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

### Mobile (`/mobile/.env`)

```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=...
API_URL=http://<your_ip>:5001/api
```

---

## ▶️ Run the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

### Mobile

```bash
cd mobile
npm install
npx expo start
```

---


## 📝 License

MIT (or any license you prefer).
