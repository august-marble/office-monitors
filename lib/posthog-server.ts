import { getWAUQuery } from './queries'
import { DashboardData } from './posthog'

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID
const POSTHOG_HOST = process.env.POSTHOG_HOST || 'https://app.posthog.com'

interface TrendsQueryResult {
  results: Array<{
    data: number[]
    labels: string[]
    count: number
  }>
}

async function executeQueryServer(query: object): Promise<TrendsQueryResult> {
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
      body: JSON.stringify({ query }),
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

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export async function fetchDashboardDataServer(): Promise<DashboardData> {
  try {
    // Generate fresh query with current SF date on each request
    const result = await executeQueryServer(getWAUQuery())

    const data = result.results[0]?.data ?? []
    const labels = result.results[0]?.labels ?? []

    // Latest WAU value (most recent day)
    const weeklyActiveUsers = data[data.length - 1] ?? 0

    // Trend: compare today vs 7 days ago
    const todayValue = data[data.length - 1] ?? 0
    const weekAgoValue = data[data.length - 8] ?? 0

    // Build chart data (sample weekly to avoid too many points)
    const wauChart: { date: string; value: number }[] = []
    for (let i = 0; i < labels.length; i += 7) {
      wauChart.push({
        date: formatDate(labels[i]),
        value: data[i],
      })
    }
    // Always include the latest data point
    if (labels.length > 0 && (labels.length - 1) % 7 !== 0) {
      wauChart.push({
        date: formatDate(labels[labels.length - 1]),
        value: data[data.length - 1],
      })
    }

    return {
      weeklyActiveUsers,
      wauTrend: calculateTrend(todayValue, weekAgoValue),
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
