# Office Monitors Dashboard

A Next.js web app that displays PostHog metrics on office TVs and monitors. Designed for large, readable displays with auto-refresh.

![Marble branded dashboard](https://marble.ai)

## Features

- **Large metric display** - Weekly Active Users shown in huge, readable text
- **7-day trend chart** - Visual history with partial week indicator
- **Auto-refresh** - Updates every 60 seconds
- **Token-based access control** - Secure URL prevents unauthorized access
- **TV-optimized layout** - Designed for viewing from across the room

## Setup

### 1. Clone and install

```bash
git clone https://github.com/august-marble/office-monitors.git
cd office-monitors
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
POSTHOG_API_KEY=phx_your_api_key_here
POSTHOG_PROJECT_ID=your_project_id
POSTHOG_HOST=https://app.posthog.com
REFRESH_INTERVAL=60
ACCESS_TOKEN=your-secret-token-here
```

### 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000?token=your-secret-token-here`

## Deployment (Vercel)

1. Push this repo to GitHub
2. Connect the repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel's dashboard (Settings → Environment Variables)
4. Deploy

Your dashboard will be available at:
```
https://your-app.vercel.app?token=your-secret-token-here
```

## Access Control

The dashboard is protected by a URL token. Only requests with the correct `?token=` parameter can view the metrics. After the first visit, a cookie is set so subsequent page loads don't need the token in the URL.

To change the token, update `ACCESS_TOKEN` in your environment variables (both locally and in Vercel).

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Recharts
- PostHog HogQL API
