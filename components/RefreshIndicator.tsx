'use client'

import { useState, useEffect } from 'react'

interface RefreshIndicatorProps {
  lastUpdated: Date
  interval: number
  isLoading?: boolean
  error?: string | null
}

export function RefreshIndicator({
  lastUpdated,
  interval,
  isLoading,
  error,
}: RefreshIndicatorProps) {
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    const updateTimeAgo = () => {
      const seconds = Math.floor((Date.now() - lastUpdated.getTime()) / 1000)
      if (seconds < 60) {
        setTimeAgo(`${seconds}s ago`)
      } else {
        const minutes = Math.floor(seconds / 60)
        setTimeAgo(`${minutes}m ago`)
      }
    }

    updateTimeAgo()
    const timer = setInterval(updateTimeAgo, 1000)
    return () => clearInterval(timer)
  }, [lastUpdated])

  return (
    <div className="flex items-center gap-vw text-vw-small">
      {error && (
        <span className="text-rose-600 flex items-center gap-vw">
          <svg className="w-[clamp(0.875rem,1.2vw,1.5rem)] h-[clamp(0.875rem,1.2vw,1.5rem)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Error
        </span>
      )}
      <div className="flex items-center gap-vw text-text-muted">
        {isLoading ? (
          <>
            <span className="h-[clamp(0.4rem,0.5vw,0.75rem)] w-[clamp(0.4rem,0.5vw,0.75rem)] bg-marble-blue rounded-full animate-pulse-dot" />
            <span>Updating...</span>
          </>
        ) : (
          <>
            <span className="h-[clamp(0.4rem,0.5vw,0.75rem)] w-[clamp(0.4rem,0.5vw,0.75rem)] bg-emerald-500 rounded-full" />
            <span>Updated {timeAgo}</span>
          </>
        )}
      </div>
    </div>
  )
}
