# Mollapara Social Welfare Association — Frontend

> মোল্লাপাড়া সমাজ কল্যাণ সংস্থা — Next.js Frontend Application

## Live Link

> 🔗 Coming Soon

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2 | React framework (App Router) |
| React | 19.2 | UI library |
| TypeScript | 5.9 | Type safety |
| Redux Toolkit | 2.12 | State management |
| RTK Query | — | API data fetching & caching |
| Tailwind CSS | 4.3 | Utility-first styling |
| Framer Motion | 12.4 | Animations |
| Zod | 4.4 | Schema validation |
| React Hook Form | 7.77 | Form management |
| Radix UI | — | Accessible UI primitives |
| Axios | 1.18 | HTTP client |
| React Toastify | 11.1 | Toast notifications |

## Features

- **Next.js App Router** with parallel routes (`(user)`, `(admin)`, `(auth)`)
- **RTK Query** for API data fetching with automatic caching & invalidation
- **JWT authentication** with httpOnly cookie-based refresh token rotation
- **Role-based UI** — admin dashboard vs public pages
- **Responsive design** — mobile-first with Tailwind CSS
- **Bengali-first** UI with `lang="bn"` and Bengali content
- **Form validation** with Zod schemas + React Hook Form
- **Smooth animations** with Framer Motion
- **Image optimization** via `next/image` with Cloudinary & YouTube thumbnails
- **SEO** with per-page Metadata exports

## Project Structure

```
frontend/
├── public/
│   └── assets/               # Static images (logos, backgrounds)
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout (providers, fonts)
│   │   ├── loading.tsx       # Global loading spinner
│   │   ├── (user)/           # Public routes
│   │   │   ├── layout.tsx    # Navbar + Footer layout
│   │   │   ├── page.tsx      # Home page
│   │   │   ├── about/        # About page
│   │   │   ├── members/      # Members list + detail [id]
│   │   │   ├── news/         # News list + detail [id]
│   │   │   ├── gallery/      # Photo gallery
│   │   │   ├── contact/      # Contact form
│   │   │   ├── donate/       # Donation page
│   │   │   ├── education/    # Education aid form
│   │   │   ├── blood-donation/ # Blood donation
│   │   │   └── our-program/  # Programs
│   │   ├── (admin)/
│   │   │   └── dashboard/    # Admin dashboard
│   │   │       ├── page.tsx
│   │   │       ├── members/
│   │   │       ├── gallery/
│   │   │       ├── complain/
│   │   │       ├── finance/
│   │   │       └── ...
│   │   └── (auth)/
│   │       └── login/        # Login page
│   ├── components/
│   │   └── shared/           # Shared components (Modal, etc.)
│   ├── features/
│   │   ├── components/       # Page view components (20+ files)
│   │   ├── auth/             # Login/Register forms
│   │   ├── admin/            # Admin dashboard components
│   │   ├── types/            # Shared TypeScript types + Zod schemas
│   │   └── products/         # (Unused/legacy)
│   ├── Redux/
│   │   ├── store/
│   │   │   ├── store.ts      # Redux store config
│   │   │   ├── baseApi.ts    # RTK Query base API
│   │   │   └── axiosBaseQuery.ts # Custom axios base query
│   │   ├── api/              # 16 API slices
│   │   │   ├── authApi.ts
│   │   │   ├── userApi.ts
│   │   │   ├── newsApi.ts
│   │   │   ├── galleryApi.ts
│   │   │   ├── bloodDonorApi.ts
│   │   │   ├── bloodRequestApi.ts
│   │   │   ├── contactApi.ts
│   │   │   ├── complainApi.ts
│   │   │   ├── fundsApi.ts
│   │   │   ├── videoApi.ts
│   │   │   ├── scholarshipApi.ts
│   │   │   ├── upcomingEventApi.ts
│   │   │   ├── galleryCategoryApi.ts
│   │   │   ├── costingApi.ts
│   │   │   ├── monthlyChandaApi.ts
│   │   │   └── projectFundApi.ts
│   │   └── types/types.ts    # Shared TypeScript types
│   ├── lib/
│   │   └── utils.ts          # Utility functions
│   └── globals.css           # Global styles + Tailwind
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 18
- Backend API running (see [Backend README](../backend/README.md))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/club-frontend.git
cd club-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Pages

### Public (`/`)

| Route | Description |
|-------|-------------|
| `/` | Home page — hero, impact stats, gallery, news, videos |
| `/about` | About the organization |
| `/members` | Member directory |
| `/members/[id]` | Individual member profile |
| `/news` | News & announcements |
| `/news/[id]` | Individual news article |
| `/gallery` | Photo gallery |
| `/contact` | Contact form |
| `/donate` | Donation page with payment methods |
| `/education` | Education aid application form |
| `/blood-donation` | Blood donor registration & blood requests |
| `/our-program` | Organization programs |

### Admin (`/dashboard`)

| Route | Description |
|-------|-------------|
| `/dashboard` | Admin dashboard overview |
| `/dashboard/members` | Member management |
| `/dashboard/gallery` | Gallery management |
| `/dashboard/complain` | Complaint management |
| `/dashboard/finance` | Finance management |
| `/dashboard/media` | Media management |
| `/dashboard/notifications` | Notifications |

### Auth (`/login`)

| Route | Description |
|-------|-------------|
| `/login` | User login |

## API Integration

The frontend connects to the backend via RTK Query. All API slices are in `src/Redux/api/`.

**Base Query:** Axios-based with automatic:
- Cookie-based credentials (`withCredentials: true`)
- 401 interception → refresh token retry
- Error normalization

**API Slices:**
`authApi`, `userApi`, `newsApi`, `galleryApi`, `galleryCategoryApi`, `fundsApi`, `bloodDonorApi`, `bloodRequestApi`, `contactApi`, `complainApi`, `videoApi`, `scholarshipApi`, `upcomingEventApi`, `costingApi`, `monthlyChandaApi`, `projectFundApi`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Set environment variable: `NEXT_PUBLIC_API_URL` → your backend API URL
4. Deploy

### Other Platforms

```bash
npm run build
npm run start
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT — Rasel Hasan
