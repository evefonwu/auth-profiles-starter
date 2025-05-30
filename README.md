# Auth and Profiles Starter Kit (Next.js, Supabase)

This is a Next.js + Supabase Magic Link Authentication and User Profiles Starter.

For email / password authentication and getting started with Supabase, definitely check out the "Next.js and Supabase Starter Kit" [https://demo-nextjs-with-supabase.vercel.app/](https://demo-nextjs-with-supabase.vercel.app/)

## Tech Stack

- **Next.js 15** with App Router
- **Supabase** for authentication and database
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** for styling
- **@supabase/ssr** for server-side session management

## Features

### Magic Link Authentication

- Login with mail verification (users enter email and receive secure login link)
- Clicking the link authenticates users via the callback route
- Server-side session handling via @supabase/ssr
- Automatic token refresh via middleware - sessions stay valid
- Auth state is managed globally via React Context

### Dashboard Page

- Personalized welcome with name/avatar
- Link to profile page

### User Profile View/Edit Page

- View profile information
- Edit full name, generate avatar

### Secure Database Layer

- RLS policies ensure user only access their own profile
- Server-side functions for safe data fetching
- Client-side functions for user interactions
- Proper TypeScript interfaces and error handling

### Accessible, Responsive UI

- Responsive design for mobile and desktop
- Navigation between dashboard and profile page

## Demo

View a working demo at [https://auth-profiles-starter.vercel.app/](https://auth-profiles-starter.vercel.app/)

Have docs/ screenshots for reference

## Clone and run locally

```bash
# Clone and install
pnpm install

# Set up local environment variables
cp .env.example .env.local
# Add your Supabase URL and anon key

# From Supbase SQL editor:
# Execute SQL files in sql/ folder

# Update Supabase Auth:
# Add Redirect URL http://localhost:3000/**

# Start development server
npm run dev
```
