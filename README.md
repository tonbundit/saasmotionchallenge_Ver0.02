# SoloStudio-SaaS-Boilerplate 🚀

A high-performance, scalable SaaS platform foundation focused on interactive UI and motion graphics assets. Built by Senior Architects for serious developers.

## 🛠 Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS (Minimal Brutalism Design System)
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod (Strict Schema Validation)
- **Authentication**: Supabase Auth / NextAuth.js Ready
- **Animation**: Framer Motion & Lottie-ready

## 📂 Feature-based Architecture

The project follows a **Clean Architecture** with a **Feature-based Modular Structure**. Each vertical feature is self-contained in `src/features/[feature-name]`.

```text
src/
├── app/                  # Route handlers & layouts
├── components/           # Shared UI components (Atomic design)
│   └── ui/               # Minimal Brutalism core components
├── features/             # Vertical features (Modular)
│   └── [feature-name]/
│       ├── components/   # Feature-specific UI
│       ├── hooks/        # Feature-specific hooks
│       ├── server-actions/# Feature-specific backend logic
│       └── schemas/      # Zod validation schemas
├── lib/                  # Shared utilities (DB, Auth, etc)
├── hooks/                # Global shared hooks
└── types/                # Global TypeScript types
```

## 💅 Design System: Minimal Brutalism

Built for high-contrast impact and performance.

- **Borders**: 3px-4px Thick Black Borders
- **Shadows**: Hard 5px-8px Drop Shadows (Non-blurry)
- **Typography**: High-contrast Sans-serif (Geist)
- **Colors**: Limited high-contrast palette (#FFFFFF, #000000, #E8FF47)

## 🏗 Setup Guide

### 1. Requirements

- Node.js 20+
- PostgreSQL instance (Docker or Cloud)

### 2. Installation

```bash
npm install
```

### 3. Database Setup

Create a `.env` file and add your `DATABASE_URL`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/solostudio"
```

Then run migrations:

```bash
npx prisma db push
```

### 4. Development

```bash
npm run dev
```

## 🔐 Security Standards

- **Zero Secret Leaks**: All keys are strictly server-side accessed via `.env`.
- **RBAC Ready**: Schema includes roles and organization-based access.
- **Strict Sanitization**: Zod validation on every API route and server action.

---

Built with 🖤 by **SoloStudio**. Optimizing for Frame-rate, Scalability, and Clean Code.
