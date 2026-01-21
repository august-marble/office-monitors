// Query configuration for dashboard metrics
// Uses the same query as "Weekly Active Users - All Intelligence" insight (ID: 6027288)

// San Francisco timezone
const SF_TIMEZONE = 'America/Los_Angeles'

/**
 * Get today's date in San Francisco time as YYYY-MM-DD
 */
function getTodayInSF(): string {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: SF_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return formatter.format(now) // Returns YYYY-MM-DD format
}

/**
 * Get a date N days ago in San Francisco time as YYYY-MM-DD
 */
function getDateDaysAgoInSF(daysAgo: number): string {
  const now = new Date()
  // First get today in SF timezone to account for timezone offset
  const sfNow = new Date(
    now.toLocaleString('en-US', { timeZone: SF_TIMEZONE })
  )
  sfNow.setDate(sfNow.getDate() - daysAgo)

  const year = sfNow.getFullYear()
  const month = String(sfNow.getMonth() + 1).padStart(2, '0')
  const day = String(sfNow.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Generate the WAU query with explicit dates in San Francisco time
 */
export function getWAUQuery() {
  const dateFrom = getDateDaysAgoInSF(90)
  const dateTo = getTodayInSF()

  return {
    kind: 'InsightVizNode',
    source: {
      kind: 'TrendsQuery',
      series: [
        {
          kind: 'EventsNode',
          math: 'weekly_active',
          event: 'chat:create',
        },
      ],
      filterTestAccounts: true,
      dateRange: {
        date_from: dateFrom,
        date_to: dateTo,
      },
    },
  }
}

// Keep static version for backwards compatibility (uses SF time)
export const WAU_QUERY = getWAUQuery()

// Insight ID for Weekly Active Users - All Intelligence
export const WAU_INSIGHT_ID = 6027288
