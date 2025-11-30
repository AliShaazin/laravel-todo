# Laravel Todo App

A full-stack Todo application built with a Laravel backend and a Next.js frontend.

## Features

- User registration and login (JWT authentication)
- Create, update, delete, and mark tasks as completed
- View all tasks for the authenticated user
- Responsive UI with modern design (wip)
- Secure API routes using Laravel Sanctum

## Tech Stack

- **Backend:** Laravel, Sanctum
- **Frontend:** Next.js, React, Tailwind CSS
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
