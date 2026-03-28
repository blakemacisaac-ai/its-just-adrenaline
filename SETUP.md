# Its Just Adrenaline — Setup Guide

## Tech Stack
- **Next.js 14** (App Router) — frontend & API
- **Supabase** — auth + database (Postgres with RLS)
- **Stripe** — one-time $38 purchase
- **Vercel** — deployment

---

## 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) → New project
2. In the SQL Editor, paste and run the entire contents of `supabase/schema.sql`
3. In Authentication → Providers, enable **Google** OAuth (add your Google Client ID/Secret)
4. In Project Settings → API, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY`

---

## 2. Stripe Setup

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Create a **Product**: "Just Adrenaline — Full 90-Day Program"
3. Add a one-time **Price**: $38.00 USD
4. Copy the Price ID (starts with `price_`) → `STRIPE_PRICE_ID`
5. Copy your **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
6. Copy your **Secret key** → `STRIPE_SECRET_KEY`
7. For webhooks (after deploying):
   - Add webhook endpoint: `https://yourdomain.com/api/webhook`
   - Listen for: `checkout.session.completed`
   - Copy Webhook Signing Secret → `STRIPE_WEBHOOK_SECRET`

---

## 3. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in all values:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## 4. Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

---

## 5. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Project → Settings → Environment Variables
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for auto-deploys.

---

## 6. Post-Deployment

1. Update `NEXT_PUBLIC_APP_URL` in Vercel env vars to your live domain
2. Add your live domain to Supabase → Authentication → URL Configuration → Site URL
3. Update your Stripe webhook URL to the live domain
4. In Supabase → Authentication → Providers → Google, add your production redirect URL

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                 ← Home (server component)
│   ├── layout.tsx               ← Root layout + fonts
│   ├── globals.css              ← All styles
│   ├── auth/
│   │   ├── login/page.tsx       ← Login page
│   │   ├── signup/page.tsx      ← Signup page
│   │   ├── callback/route.ts    ← OAuth callback
│   │   └── signout/route.ts     ← Sign out
│   ├── program/page.tsx         ← 90-day program browser
│   ├── day/[id]/page.tsx        ← Individual lesson
│   ├── panic/page.tsx           ← Panic Pocket
│   ├── progress/page.tsx        ← Progress & journal history
│   └── api/
│       ├── stripe/
│       │   ├── checkout/route.ts  ← Create Stripe session
│       │   └── success/route.ts   ← Handle payment success
│       └── webhook/route.ts     ← Stripe webhook (unlocks account)
├── components/
│   ├── HomeClient.tsx           ← Home interactive layer
│   ├── ProgramClient.tsx        ← Program browser
│   ├── DayClient.tsx            ← Lesson + journal + task
│   ├── ProgressClient.tsx       ← Charts + journal history
│   └── BottomNav.tsx            ← Navigation bar
├── lib/
│   ├── program-data.ts          ← All 90-day content (add more here)
│   └── supabase/
│       ├── client.ts            ← Browser Supabase client
│       ├── server.ts            ← Server Supabase client
│       └── middleware.ts        ← Auth session refresh
└── middleware.ts                ← Route protection

supabase/
└── schema.sql                   ← Run this in Supabase SQL Editor
```

---

## Adding More Days

Open `src/lib/program-data.ts` and add new day objects to the appropriate arc's weeks array. Follow the existing structure. The UI will automatically pick them up.
