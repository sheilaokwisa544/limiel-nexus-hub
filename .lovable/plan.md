## What already exists (from the last turn)

- Landing page with all 12 sections, brand system, glass/gradients, animations
- Customer portal at `/dashboard` (welcome, policies, renewals, claims, payments, PDF download stub, animated counters, charts, responsive tables)
- 5-step Quote Wizard at `/quote` (progress bar, auto-save to localStorage, validation, animated transitions, review, payment)
- Admin preview at `/admin` (policies sold, revenue, customers, claims, charts, recent applications)
- Chat widget, dark-mode toggle, sticky nav, footer, login, sitemap, robots

## Stack reality check

You asked for **Node.js + Express + Prisma + PostgreSQL** as a separate backend. This project is **TanStack Start on Cloudflare Workers** — the "backend" is TanStack server functions + Lovable Cloud (managed Postgres + Auth + Storage). I won't spin up a second Node/Express service; instead I'll deliver the same capabilities on the built-in backend, which is faster, edge-deployed, and doesn't need Docker/Nginx/Render.

Similarly:
- **Swagger/OpenAPI, Docker, Nginx, GitHub Actions, Render/Railway** — not applicable; deployment is one-click on Lovable.
- **Cloudinary / AWS S3** — replaced by Lovable Cloud Storage.
- **Heroicons** — this project already uses Lucide (same style, better tree-shaking). I'll keep Lucide.
- **React Router** — TanStack Router is already wired in and is a superset. I'll keep it.
- **M-Pesa / Flutterwave / PayPal live payments** — need real merchant credentials. I'll wire the UI + a mock server function and leave a clear TODO. Stripe can be enabled via Lovable's built-in Stripe integration when you're ready.

## What I'll ship next (proposed, one turn each)

### Turn A — Backend + real auth (biggest unlock)
Enable Lovable Cloud and add:
- Auth: email/password + Google (register, login, forgot password, email verify, JWT via Supabase)
- Roles table: `customer`, `agent`, `admin`, `super_admin` (separate `user_roles` table + `has_role` function — no privilege escalation)
- Tables + RLS: `profiles`, `providers`, `products`, `quotes`, `policies`, `claims`, `payments`, `documents`, `notifications`, `favorites`
- Storage buckets for KYC docs and claim uploads
- Server functions for CRUD, quote engine (age/vehicle/coverage/location/sum-assured), claim submission, policy PDF download

### Turn B — Differentiators layer
- AI insurance recommendation engine (Lovable AI Gateway → Gemini) on the wizard's review step
- AI chatbot in the existing chat widget (streaming, aware of products/FAQs)
- i18n: English + Swahili with a language toggle in nav
- Renewal reminders (server function ready for cron)
- Notifications center + toast
- Profile page with KYC upload

### Turn C — Polish
- PWA manifest + install prompt (home-screen, no offline caching)
- Compare-quotes page with save-to-favorites
- Advanced admin analytics (cohort, product mix, claim SLA)
- Accessibility pass (WCAG AA: focus rings, labels, contrast, keyboard nav)
- SEO: per-route og:image generation, JSON-LD for products, canonical tags

## What I need from you

1. **OK to enable Lovable Cloud** so I can add real auth + database? (This is required for anything persistent — otherwise everything stays as mock data.)
2. **Which turn should I start with — A, B, or C?** Default is A (nothing else works well without real data).
3. **Payments now or later?** I recommend later, once policies work end-to-end with mock data.

Reply with "A" (or your pick) and I'll execute. If you just say "go", I'll start with Turn A.