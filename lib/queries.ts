// Query configuration for dashboard metrics
// Uses the same query as "Weekly Active Users - All Intelligence" insight (ID: 6027288)

export const WAU_QUERY = {
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
    dateRange: { date_from: '-90d' },
  },
}

// Insight ID for Weekly Active Users - All Intelligence
export const WAU_INSIGHT_ID = 6027288
