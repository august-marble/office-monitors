'use client'

import { useCallback, useState, useEffect } from 'react'
import { TrendChart } from './TrendChart'
import { RefreshIndicator } from './RefreshIndicator'
import { MetricSkeleton, ChartSkeleton } from './Skeleton'
import { useAutoRefresh } from '@/hooks/useAutoRefresh'
import { fetchDashboardData, DashboardData } from '@/lib/posthog'

interface DashboardProps {
  initialData: DashboardData
  refreshInterval: number
}

export function Dashboard({ initialData, refreshInterval }: DashboardProps) {
  const [hasLoaded, setHasLoaded] = useState(false)
  const fetchData = useCallback(() => fetchDashboardData(), [])

  const { data, isLoading, lastUpdated, error } = useAutoRefresh(
    fetchData,
    refreshInterval * 1000,
    initialData
  )

  useEffect(() => {
    if (data.weeklyActiveUsers > 0 || data.wauChart.length > 0) {
      setHasLoaded(true)
    }
  }, [data])

  const showSkeleton = !hasLoaded && isLoading

  return (
    <div className="h-screen w-screen overflow-hidden marble-bg flex flex-col">
      {/* Header - compact for TV */}
      <header className="border-b border-border px-vw py-vw bg-white/80 backdrop-blur-sm shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-vw">
            {/* Marble logo */}
            <svg className="w-[clamp(2rem,3vw,4rem)] h-[clamp(2rem,3vw,4rem)]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="15" stroke="#141E24" strokeWidth="2" fill="none"/>
            </svg>
            <span className="text-vw-title font-semibold text-text-primary">marble</span>
          </div>
          <RefreshIndicator
            lastUpdated={lastUpdated}
            interval={refreshInterval}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </header>

      {/* Main content - fills remaining space */}
      <main className="flex-1 flex flex-col px-vw py-vw min-h-0 overflow-hidden">
        {/* Hero metric section - takes up available space, never overlaps chart */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 overflow-hidden">
          {showSkeleton ? (
            <MetricSkeleton />
          ) : (
            <div className="text-center max-h-full overflow-hidden">
              <p className="text-text-secondary font-serif text-vw-title mb-vw">
                Weekly Active Users
              </p>
              <h1 className="text-vw-hero font-semibold text-text-primary tabular-nums leading-none metric-value">
                {data.weeklyActiveUsers.toLocaleString()}
              </h1>
              {data.wauTrend !== 0 && (
                <div className="mt-vw inline-flex items-center gap-vw px-vw py-vw rounded-full bg-surface-secondary">
                  <span
                    className={`text-vw-subtitle font-medium ${
                      data.wauTrend >= 0 ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {data.wauTrend >= 0 ? '↑' : '↓'} {Math.abs(data.wauTrend).toFixed(1)}%
                  </span>
                  <span className="text-text-muted text-vw-body">vs last week</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chart section - constrained height at bottom */}
        <div className="shrink-0 chart-card overflow-hidden bg-white rounded-vw shadow-card border border-border p-vw max-w-vw-chart mx-auto w-full">
          {showSkeleton ? (
            <ChartSkeleton />
          ) : (
            <TrendChart
              title="Weekly Active Users"
              subtitle="Last 12 weeks"
              data={data.wauChart}
              color="#144C82"
              compact
            />
          )}
        </div>
      </main>
    </div>
  )
}
