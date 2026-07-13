# Mollahpara Social Welfare Association — Frontend

> মোল্লাপাড়া সমাজ কল্যাণ সংস্থা — Official Web Platform (Frontend)

A full-featured Next.js application for a community welfare organization — public-facing pages (news, gallery, blood donation, education aid, donations) plus a role-protected admin dashboard for managing members, finances, and content.

**Live:** Coming Soon
**Backend repo:** [Mollahpara-Social-Welfare-backend](https://github.com/Rasel-231/Mollahpara-Social-Welfare-backend)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| UI Library | React 19.2 |
| Language | TypeScript 5.9 |
| State / Data | Redux Toolkit 2.12 + RTK Query |
| Styling | Tailwind CSS 4.3 |
| Animation | Framer Motion 12 |
| Forms | React Hook Form 7 + Zod 4 |
| UI Primitives | Radix UI |
| HTTP Client | Axios |
| Notifications | React Toastify / Sonner |

---

## Features

- **App Router route groups** — `(user)` public site, `(admin)` dashboard, `(auth)` login, each with its own layout
- **RTK Query** data layer with tag-based cache invalidation across 16 API slices
- **Cookie-based JWT authentication** with access/refresh token rotation
- **Role-aware admin dashboard** — members, finance, gallery, complaints, media, notifications
- **Bengali-first UI** (`lang="bn"`) with full localized content
- **Cloudinary-backed image delivery** via `next/image`
- **Zod-validated forms** for every user-facing submission (donation, education aid, blood requests, contact)
- Mobile-first, responsive layouts throughout

---

## Project Structure

```
frontend/
├── public/assets/            # Static images (logos, backgrounds)
├── src/
│   ├── app/
│   │   ├── (user)/           # Public site — home, about, news, gallery, donate, etc.
│   │   ├── (admin)/dashboard # Admin panel — members, finance, gallery, complaints
│   │   └── (auth)/login      # Login
│   ├── components/shared/    # Shared primitives (Modal, etc.)
│   ├── features/
│   │   ├── components/       # Page-level view components
│   │   ├── auth/              # Login/register forms
│   │   ├── admin/              # Dashboard components + hooks (incl. route guard)
│   │   └── types/              # Shared types + Zod schemas
│   ├── Redux/
│   │   ├── store/             # store.ts, baseApi.ts, axiosBaseQuery.ts
│   │   ├── api/                # 16 RTK Query API slices
│   │   └── types/types.ts     # Shared TypeScript types
│   └── lib/utils.ts
├── proxy.ts                   # Route matcher config (Next.js 16 middleware convention)
├── next.config.ts
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- Backend API running — see the [backend README](https://github.com/Rasel-231/Mollahpara-Social-Welfare-backend)

### Installation

```bash
git clone https://github.com/Rasel-231/Mollahpara-Social-Welfare-frontend.git
cd Mollahpara-Social-Welfare-frontend

npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev
```

App runs at `http://localhost:3000`.

### Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API, e.g. `http://localhost:5000/api/v1` |

> In production this must point to the deployed backend origin (e.g. Railway), and the backend's CORS `origin` must match this app's deployed URL exactly.

### Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

---

## Pages

### Public

| Route | Description |
|---|---|
| `/` | Home — hero, impact stats, gallery, news, videos |
| `/about` | About the organization |
| `/members`, `/members/[id]` | Member directory and profiles |
| `/news`, `/news/[id]` | News and announcements |
| `/gallery` | Photo gallery |
| `/contact` | Contact form |
| `/donate` | Donation page with payment methods |
| `/education` | Education aid application |
| `/blood-donation` | Blood donor registration and requests |
| `/our-program` | Organization programs |

### Admin (`/dashboard`) — ADMIN / MODERATOR only

| Route | Description |
|---|---|
| `/dashboard` | Overview |
| `/dashboard/members` | Member management |
| `/dashboard/gallery` | Gallery management |
| `/dashboard/complain` | Complaint management |
| `/dashboard/finance` | Finance management |
| `/dashboard/media` | Media management |
| `/dashboard/notifications` | Notifications |

### Auth

| Route | Description |
|---|---|
| `/login` | User login |

---

## API Integration

All API calls go through RTK Query slices in `src/Redux/api/`, backed by a shared Axios instance (`axiosBaseQuery.ts`) that provides:

- `withCredentials: true` for cookie-based auth on every request
- Automatic 401 handling with refresh-token retry
- Normalized error shape across all slices

**Slices:** `authApi`, `userApi`, `newsApi`, `galleryApi`, `galleryCategoryApi`, `fundsApi`, `bloodDonorApi`, `bloodRequestApi`, `contactApi`, `complainApi`, `videoApi`, `scholarshipApi`, `upcomingEventApi`, `costingApi`, `monthlyChandaApi`, `projectFundApi`

### Auth model & cross-origin notes

Frontend and backend are deployed on **different origins** (Vercel + Railway), so authentication relies on cross-site cookies rather than same-site defaults:

- Backend sets `accessToken` as an `httpOnly` cookie with `sameSite: 'none'` and `secure: true` in production.
- Route protection for `/dashboard/*` is enforced **client-side**, via a `useAdminGuard` hook (`src/features/admin/hooks`) that calls the `profile` endpoint and redirects based on the result — a server-side `proxy.ts`/middleware check cannot read the backend's cookie across origins, since the two apps don't share a domain.
- Client-side route guarding is a UX layer only; all real authorization is enforced by the backend's `auth()` middleware on each protected endpoint.

---

## Deployment

### Vercel (frontend)

1. Push to GitHub
2. Import the repository at [vercel.com](https://vercel.com)
3. Set `NEXT_PUBLIC_API_URL` to the deployed backend URL
4. Deploy

### Backend

Deployed separately (e.g. Railway) — see the [backend README](https://github.com/Rasel-231/Mollahpara-Social-Welfare-backend). Ensure its CORS `origin` and cookie `sameSite`/`secure` settings match this app's deployed origin.

### Self-hosted

```bash
npm run build
npm run start
```

---

## Browser Support

Latest versions of Chrome, Firefox, Safari, and Edge.

---

## License

MIT — Rasel Hasan