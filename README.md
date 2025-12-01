# Laravel Todo App

A full-stack Todo application built with a Laravel backend and a Next.js frontend.

## Features

- User registration and login (JWT authentication)
- Create, update, delete, and mark tasks as completed
- View all tasks for the authenticated user
- Real-time task updates using Laravel Echo and Socket.IO
- Responsive UI with modern design (wip)
- Secure API routes using Laravel Sanctum

## Tech Stack

- **Backend:** Laravel, Sanctum, Laravel Echo, Redis
- **Frontend:** Next.js, React, Tailwind CSS, Laravel Echo, Socket.IO Client
- **Database:** MySQL (or any Laravel-supported DB)

## Getting Started

### Backend (Laravel)

1. Install dependencies:
   ```bash
   composer install
   ```
2. Copy `.env.example` to `.env` and set your database credentials.
3. Generate app key:
   ```bash
   php artisan key:generate
   ```
4. Run migrations:
   ```bash
   php artisan migrate
   ```
5. Start the server:
   ```bash
   php artisan serve
   ```
6. Start the queue worker (for broadcasting):
   ```bash
   php artisan queue:work
   ```

#### Required `.env` settings for Socket.IO broadcasting

Add or update these lines in your Laravel `.env` file:

```env
BROADCAST_DRIVER=socket.io
QUEUE_CONNECTION=redis

REDIS_CLIENT=predis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=null

SANCTUM_STATEFUL_DOMAINS=localhost,localhost:3000
```

### Echo Server

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Configure `laravel-echo-server.json` for your environment, including:
   ```json
   "apiOriginAllow": {
     "allowCors": true,
     "allowOrigin": "http://localhost:3000",
     "allowMethods": "GET, POST, PUT, PATCH, DELETE",
     "allowHeaders": "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id"
   }
   ```
3. Start the Echo server:
   ```bash
   npx laravel-echo-server start
   ```

### Frontend (Next.js)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set `NEXT_PUBLIC_API_URL` in `.env.local` to your backend URL (e.g. `http://localhost:8000/api`)
3. Start the frontend:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/register` — Register a new user
- `POST /api/login` — Login and receive access token
- `GET /api/tasks` — Get all tasks (auth required)
- `POST /api/tasks` — Create a new task (auth required)
- `PUT /api/tasks/{id}` — Update a task (auth required)
- `DELETE /api/tasks/{id}` — Delete a task (auth required)
- `PATCH /api/tasks/{id}/complete` — Mark task as completed (auth required)

## Usage

1. Register a new account or login.
2. Add, edit, delete, and complete tasks.
3. All actions require authentication.
4. Task changes are updated in real-time across all connected clients.
