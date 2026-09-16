# Soheyl Fitness

A recipe nutrition tracker and workout logger for fitness enthusiasts who meal prep. Track macros per portion, plan weekly meals, and log workouts with biomechanical validation.

Repository: https://github.com/SoheylEbrahimzadeh/soheyl-fitness-planner

## Features

- **Recipe Management** — Create recipes with ingredients, track cooked weight vs raw weight, record fat discarded during cooking, define portion sizes. Supports subrecipes (recipes as components of other recipes)
- **Recipe Import** — Import recipes from URLs (JSON-LD structured data → AI fallback) or pasted text
- **Premade Meals** — Add pre-made products via nutrition label data or URL parsing
- **Macro Visualization** — MacroRing (donut chart showing P/C/F caloric ratio), MacroBar (stacked horizontal bar), per-portion readouts
- **Ingredient Units** — AI-populated unit conversions (tbsp, scoop, pcs) with gram equivalents; density-based volume calculations
- **Preparation Tracking** — Auto-extracts preparation descriptors ("minced", "finely chopped") from ingredient names
- **AI-Powered Ingredient Lookup** — USDA FoodData Central API priority, AI fallback (Gemini/OpenAI/Anthropic BYOK). Batch lookups and model fallback configurable per user
- **Weekly Meal Planning** — Template-based weekly planner with per-plan recipe inventory and portion tracking
- **Workout Tracking** — Template-based training with checklist-driven session logging, supersets, auto-generated warmup/backoff sets, fatigue-tier-based rest timers, and interactive body map
- **Rest Alerts** — Optional Web Push notifications when a rest ends, including after the installed app is closed or the phone is locked, with local-only offline fallback
  - Enable them under Settings → Rest alerts, approve browser notifications, then use **Test notification** to verify delivery on the device.
  - Delivery is intentionally best-effort: Queue retries are disabled, avoiding stale late alerts at the cost of a rare missed accepted alert if consumer processing fails.
  - Pages previews disable rest alert mutations so preview traffic cannot create production notification jobs.
- **Training Locations** — Define the places you train (gym, home, hotel) with equipment checklists; templates and sessions warn when an exercise needs equipment the location doesn't have
- **Auth** — Google/GitHub OAuth via Clerk
- **Responsive Design** — Two-column editor on desktop, mobile-first with bottom tab navigation

## Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite 7 + Tailwind CSS 4
- tRPC + TanStack Query for data fetching
- react-router-dom for routing
- @dnd-kit for drag-and-drop (ingredient reordering, meal plan allocation)

**Backend:**
- Cloudflare Pages Functions (Hono + tRPC)
- Cloudflare D1 (SQLite) with Drizzle ORM
- Cloudflare Queues + a dedicated Worker for delayed rest-alert delivery
- Clerk for authentication (cookie-based sessions)
- AES-GCM encrypted API key storage

## Project Structure

```
src/
├── components/
│   ├── layout/              # RootLayout, Nav (desktop top + mobile bottom tabs + RestTimer)
│   └── ui/                  # Button, Card, Input, NumberInput, Select, Switch, Spinner, etc.
├── features/
│   ├── recipes/
│   │   ├── components/      # MacroRing, MacroBar, MacroReadout, PortionPanel, RecipeImportDialog,
│   │   │                    #   PremadeDialog, SubrecipeExpandedRows, IngredientSearchInput, etc.
│   │   ├── hooks/           # useRecipeCalculations
│   │   ├── utils/           # macros.ts, format.ts
│   │   ├── RecipeListPage.tsx
│   │   └── RecipeEditorPage.tsx
│   ├── ingredients/
│   │   ├── components/      # IngredientForm
│   │   └── IngredientListPage.tsx
│   ├── mealPlans/
│   │   ├── components/      # InventorySidebar, WeekGrid, DayColumn, MealCard, DayTotals,
│   │   │                    #   WeeklyAverages, SlotPickerPopover, etc.
│   │   ├── MealPlanListPage.tsx
│   │   └── MealPlannerPage.tsx
│   ├── workouts/
│   │   ├── components/      # BodyMap, ExerciseSetForm, SetRow, SupersetForm, SessionReview,
│   │   │                    #   TimerMode, TimerRing, RestTimer, RestAlertsSection, etc.
│   │   ├── hooks/           # Rest-alert delivery controller and session hooks
│   │   ├── store/           # Persisted workout session/timer state
│   │   ├── utils/           # formulas.ts, sets.ts, export.ts
│   │   ├── RestTimerContext.tsx
│   │   ├── WorkoutListPage.tsx
│   │   ├── WorkoutTemplatePage.tsx
│   │   └── WorkoutSessionPage.tsx
│   └── settings/
│       └── SettingsPage.tsx
├── lib/
│   ├── trpc.ts              # tRPC client setup
│   ├── user.tsx             # useUser() hook (Clerk)
│   └── cn.ts                # clsx + tailwind-merge utility
└── index.css                # Design tokens (surfaces, ink, macro colors, etc.)

packages/db/                 # Shared package @macromaxxing/db
├── schema.ts                # All tables, including pushSubscriptions and restNotificationJobs
├── relations.ts             # Drizzle relations
├── types.ts                 # Inferred types
├── custom-types.ts          # TypeID helpers, AiProvider, FatigueTier, MuscleGroup, SetMode, etc.
└── preparation.ts           # Preparation descriptor extraction

workers/functions/
├── api/[[route]].ts         # Hono entry: Clerk auth middleware → tRPC handler
└── lib/
    ├── router.ts            # tRPC app router (recipe, ingredient, settings, ai, dashboard, mealPlan,
    │                        #   user, workout, analytics, restNotifications)
    ├── trpc.ts              # tRPC context + procedures
    ├── auth.ts              # Clerk cookie verification
    ├── db.ts                # Drizzle D1 setup
    ├── ai-utils.ts          # Multi-provider AI client, model fallback, JSON-LD extraction
    ├── crypto.ts            # AES-GCM encryption helpers
    ├── constants.ts         # Shared constants + Zod schemas
    ├── utils.ts             # toStartCase, extractPreparation, etc.
    └── routes/
        ├── recipes.ts       # CRUD + ingredients + subrecipes + premade meals
        ├── ingredients.ts   # CRUD + findOrCreate + batchFindOrCreate + units
        ├── mealPlans.ts     # CRUD + inventory + slot allocation
        ├── workouts.ts      # Exercises, templates, sessions, sets, muscle stats, import
        ├── ai.ts            # lookup, estimateCookedWeight, parseRecipe, parseProduct
        ├── settings.ts      # AI config + body profile
        ├── restNotifications.ts # Push subscription, scheduling, cancellation, and test notification API
        └── user.ts          # User endpoints

workers/rest-notifications/  # Queue consumer that claims due jobs and sends Web Push

scripts/
└── seed-exercises.ts        # System exercises with muscle group mappings + strength standards
```

## AI Features

**Nutrition lookup priority:** USDA FoodData Central API → AI (user's configured provider)

| Provider | Default Model | Fallback Chain |
|----------|---------------|----------------|
| Gemini | `gemini-2.5-flash` | → `gemini-2.5-flash-lite-preview` → `gemma-3-27b-it` |
| OpenAI | `gpt-4o-mini` | — |
| Anthropic | `claude-sonnet-4-20250514` | — |

**Capabilities:**
- Ingredient nutritional data lookup (macros, density, units per 100g raw)
- Recipe parsing from URLs (JSON-LD structured data) or text (AI)
- Product nutrition parsing from URLs (JSON-LD Product → AI fallback)
- Cooked weight estimation from ingredients + instructions
- Batch ingredient lookups (single AI call for multiple ingredients)
- Model fallback on rate limits (429 → next model in chain)

**Per-user settings** (both off by default):
- `batchLookups` — batch N ingredient AI calls into 1
- `modelFallback` — retry with cheaper models on 429

## Design System

Dark theme with warm soapstone undertones. Key tokens in `src/index.css`:

- **Surfaces:** `surface-0` (base), `surface-1` (cards), `surface-2` (hover/elevated)
- **Ink:** `ink` (primary text), `ink-muted` (secondary), `ink-faint` (tertiary)
- **Macro colors:** `macro-protein` (copper), `macro-carbs` (golden), `macro-fat` (olive), `macro-kcal` (warm orange), `macro-fiber` (sage)
- **Accent:** Copper (`oklch(0.72 0.15 50)`)
- **Depth:** Borders-only strategy (no shadows), `edge` border color
- **Radius:** Sharp (`4px`/`6px`) for instrument-grade precision

## Getting Started (clone on any machine)

Requirements: Node `^20.19.0 || >=22.12.0` (see `.nvmrc`/`engines` in `package.json`) and Corepack enabled (ships with Node ≥16.9; run `corepack enable` once) — Corepack then picks up the pinned `yarn@4.12.0` automatically, no global Yarn install needed.

```bash
# Clone
git clone https://github.com/SoheylEbrahimzadeh/soheyl-fitness-planner.git
cd soheyl-fitness-planner

# Install dependencies (uses the pinned Yarn 4 via Corepack)
corepack enable
yarn

# Frontend env — copy the example and fill in your own Clerk key
cp .env.local.example .env.local

# Backend env — copy the example and fill in your own local values
cp workers/.dev.vars.template workers/.dev.vars
```

See [Environment Variables](#environment-variables) below for what each value is and where to get it. None of the real values belong in git — both `.env.local` and `workers/.dev.vars` are git-ignored.

### Develop from any machine (no local setup)

`.devcontainer/devcontainer.json` defines a ready-to-run [GitHub Codespaces](https://github.com/features/codespaces) environment: Node 22, Corepack, and the two example env files are copied in automatically on container creation. To use it: open the repository on GitHub → **Code → Codespaces → Create codespace on main**. Ports `1337` (web) and `8788` (API/local D1) are forwarded automatically; fill in real values in `.env.local` / `workers/.dev.vars` inside the codespace the same way you would locally (see above), then run `yarn dev`.

This makes the full loop machine-independent: **GitHub → Codespace (or any clone) → edit → `yarn check` → commit → push → `deploy.yml` deploys automatically.** No step depends on this Mac, Claude Desktop, or any process running outside of GitHub/Cloudflare.

## Development

```bash
# Run dev server (frontend + backend), served at http://localhost:1337
yarn dev

# Build
yarn build

# Typecheck
yarn typecheck

# Lint/format
yarn fix

# Database migrations
yarn db:generate   # Generate migration from schema changes
yarn db:migrate    # Apply migrations to local D1

# Run tests
yarn test
```

`localhost:1337` (set in `vite.config.ts`) is only ever used for local development — the deployed app is not reachable through it and has no dependency on it. See [Deployment](#deployment) for the production URL setup.

## Environment Variables

**Frontend** (`.env.local`, copy from `.env.local.example`):
- `VITE_CLERK_PUBLISHABLE_KEY` — Clerk publishable key
- `VITE_R2_BASE_URL` — public base URL for R2-hosted recipe images (optional for local dev)

**Workers** (`.dev.vars` locally — copy from `workers/.dev.vars.template` — Cloudflare dashboard/GitHub Actions secrets for production):
- `ENCRYPTION_SECRET` — 32-byte hex string for AES-GCM key encryption
- `USDA_API_KEY` — USDA FoodData Central API key
- `CLERK_PUBLISHABLE_KEY` — Clerk publishable key
- `CLERK_SECRET_KEY` — Clerk secret key
- `VAPID_PUBLIC_KEY` — URL-safe public key used for browser push subscriptions
- `VAPID_PRIVATE_KEY` — matching private key used only by server-side delivery
- `REST_ALERTS_ENABLED` — runtime feature gate; production enables it while Pages previews set it to `false` in `workers/wrangler.toml`

Rest alerts use the `macromaxxing-rest-notifications` Cloudflare Queue. Production needs the same VAPID key pair in the Pages project and the dedicated `macromaxxing-rest-notifications` Worker. The deploy workflow creates the queue, deploys its consumer before Pages, and configures both runtimes from the `VAPID_PUBLIC_KEY` and `VAPID_PRIVATE_KEY` GitHub Actions secrets. Never add either key to `wrangler.toml`.

## Deployment

Production deploys automatically on every push to `main` via `.github/workflows/deploy.yml`: lint → typecheck → test, then D1 migrations, the rest-notifications Worker + Queue, a `yarn build`, and `wrangler pages deploy` to Cloudflare Pages — the live URL is `https://<project-name>.pages.dev` (plus any custom domain attached in the Cloudflare dashboard), never `localhost`.

Configure these once under **GitHub repo → Settings → Secrets and variables → Actions**:

**Secrets:**
- `CLOUDFLARE_API_TOKEN` — a Cloudflare API token with Pages + Workers + D1 + Queues edit permissions for the account (create one at https://dash.cloudflare.com/profile/api-tokens)
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID (Cloudflare dashboard → right sidebar of any domain, or **Workers & Pages → Overview**)
- `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` — a Web Push VAPID key pair (generate with `npx web-push generate-vapid-keys`); used for rest-timer push notifications

**Variables:**
- `VITE_CLERK_PUBLISHABLE_KEY` — the production Clerk publishable key, baked into the client build
- `VITE_R2_BASE_URL` — the public base URL for the production R2 image bucket

**Cloudflare resources** referenced by `workers/wrangler.toml` / `workers/rest-notifications/wrangler.toml` that must exist under the same Cloudflare account before the first deploy succeeds (create them once, e.g. with `wrangler d1 create` / `wrangler r2 bucket create`, or via the dashboard):
- D1 database `macromaxxing`
- R2 bucket `macromaxxing-images`
- Queue `macromaxxing-rest-notifications` (the deploy workflow creates this one automatically if missing)

The Cloudflare Pages **project name** is derived automatically from the GitHub repository name (`soheyl-fitness-planner`) by the deploy workflow — no manual Pages project setup is needed beyond the account having the token/resources above.

**Verifying a deploy:** `GET https://<project-name>.pages.dev/api/health` pings D1 directly and returns `{"status":"ok","time":"..."}` (HTTP 503 with an error message if the D1 binding is unreachable) — no auth required, safe to use as an uptime check.

## Hosting Cost

Every piece of this stack has a free tier and current usage fits comfortably inside it — no paid Cloudflare or Clerk plan is required to run this in production:

| Service | Free tier | Notes |
|---|---|---|
| Cloudflare Pages + Pages Functions | 100,000 requests/day, unlimited static bandwidth | Functions billed as Workers requests |
| Cloudflare D1 | 5M rows read/day, 100K rows written/day, 5GB storage | |
| Cloudflare R2 | 10GB storage/month, 1M Class A + 10M Class B ops/month, **no egress fee** | |
| Cloudflare Queues | 10,000 operations/day, 24h retention | Moved to the free plan Feb 2026 |
| Clerk | 50,000 monthly retained users | Hobby plan, no credit card required |

A custom domain (optional — `*.pages.dev` works out of the box) is the only line item that could cost anything, and only if you buy one.

## License

MIT
