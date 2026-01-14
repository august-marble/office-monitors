import { WAU_QUERY } from './queries'

interface TrendsQueryResult {
  results: Array<{
    data: number[]
    labels: string[]
    count: number
  }>
}

async function executeQuery(query: object): Promise<TrendsQueryResult> {
  const response = await fetch('/api/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
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

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export interface DashboardData {
  weeklyActiveUsers: number
  wauTrend: number
  wauChart: { date: string; value: number }[]
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const result = await executeQuery(WAU_QUERY)

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
}
