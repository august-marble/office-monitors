import { QUERIES } from './queries'

interface QueryResult {
  results: unknown[][]
  columns: string[]
}

async function executeQuery(query: string): Promise<QueryResult> {
  const response = await fetch('/api/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: {
        kind: 'HogQLQuery',
        query: query,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`Query failed: ${response.statusText}`)
  }

  return response.json()
}

function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

export interface DashboardData {
  weeklyActiveUsers: number
  wauTrend: number
  wauChart: { date: string; value: number }[]
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const [wauResult, trendResult, chartResult] = await Promise.all([
    executeQuery(QUERIES.weeklyActiveUsers),
    executeQuery(QUERIES.wauTrend),
    executeQuery(QUERIES.wauChart),
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
}

function formatWeek(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
