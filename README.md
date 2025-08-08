Inventory Management System built with Next.js 15, TypeScript, Tailwind CSS, NextAuth, Mongoose, Zod.

Setup
- Create `.env.local` with:
  - `MONGODB_URI=your_mongodb_uri`
  - `NEXTAUTH_SECRET=your_random_secret`
  - `NEXTAUTH_URL=http://localhost:3000`
- Install deps: `npm install`
- Seed data: `npm run seed`
- Start dev: `npm run dev`

Default admin
- Email: `admin@example.com`
- Password: `admin123`

Features
- Credentials auth with role-based protection (middleware)
- Dashboard stats (SSR)
- CRUD: Products, Categories, Orders, Users (admin only)
