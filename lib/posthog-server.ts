import { QUERIES } from './queries'
import { DashboardData } from './posthog'

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID
const POSTHOG_HOST = process.env.POSTHOG_HOST || 'https://app.posthog.com'

interface QueryResult {
  results: unknown[][]
  columns: string[]
}

async function executeQueryServer(query: string): Promise<QueryResult> {
  if (!POSTHOG_API_KEY || !POSTHOG_PROJECT_ID) {
    throw new Error('PostHog configuration missing')
  }

  const response = await fetch(
    `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${POSTHOG_API_KEY}`,
      },
      body: JSON.stringify({
        query: {
          kind: 'HogQLQuery',
          query: query,
        },
      }),
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error(`PostHog query failed: ${response.statusText}`)
  }

  return response.json()
}

function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

function formatWeek(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export async function fetchDashboardDataServer(): Promise<DashboardData> {
  try {
    const [wauResult, trendResult, chartResult] = await Promise.all([
      executeQueryServer(QUERIES.weeklyActiveUsers),
      executeQueryServer(QUERIES.wauTrend),
      executeQueryServer(QUERIES.wauChart),
    ])

    const weeklyActiveUsers = Number(wauResult.results[0]?.[0] ?? 0)

    const thisWeek = Number(trendResult.results[0]?.[0] ?? 0)
    const lastWeek = Number(trendResult.results[0]?.[1] ?? 0)

    const wauChart = chartResult.results.map((row) => ({
      date: formatWeek(String(row[0])),
      value: Number(row[1]),
    }))

    return {
      weeklyActiveUsers,
      wauTrend: calculateTrend(thisWeek, lastWeek),
      wauChart,
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return {
      weeklyActiveUsers: 0,
      wauTrend: 0,
      wauChart: [],
    }
  }
}
