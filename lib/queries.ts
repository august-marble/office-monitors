// HogQL queries for dashboard metrics
// Based on "Total Weekly Active Users (WAU)" insight (ID: 6027288)

export const QUERIES = {
  // Weekly active users - users who triggered chat:create in the last 7 days
  weeklyActiveUsers: `
    SELECT count(DISTINCT person_id) as count
    FROM events
    WHERE event = 'chat:create'
      AND timestamp >= now() - INTERVAL 7 DAY
  `,

  // Weekly active users trend (this week vs last week)
  wauTrend: `
    SELECT
      uniqIf(person_id, timestamp >= now() - INTERVAL 7 DAY) as this_week,
      uniqIf(person_id, timestamp >= now() - INTERVAL 14 DAY AND timestamp < now() - INTERVAL 7 DAY) as last_week
    FROM events
    WHERE event = 'chat:create'
      AND timestamp >= now() - INTERVAL 14 DAY
  `,

  // Weekly active users chart (rolling 7-day windows over last 12 weeks)
  wauChart: `
    SELECT
      toStartOfWeek(timestamp) as week,
      count(DISTINCT person_id) as count
    FROM events
    WHERE event = 'chat:create'
      AND timestamp >= today() - INTERVAL 90 DAY
    GROUP BY week
    ORDER BY week
  `,
}

// Insight ID for Total Weekly Active Users (WAU)
export const WAU_INSIGHT_ID = 6027288
