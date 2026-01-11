'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseAutoRefreshResult<T> {
  data: T
  isLoading: boolean
  lastUpdated: Date
  error: string | null
  refetch: () => Promise<void>
}

export function useAutoRefresh<T>(
  fetchFn: () => Promise<T>,
  intervalMs: number,
  initialData: T
): UseAutoRefreshResult<T> {
  const [data, setData] = useState<T>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const newData = await fetchFn()
      setData(newData)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      console.error('Auto-refresh error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
      // Keep showing stale data on error
    } finally {
      setIsLoading(false)
    }
  }, [fetchFn])

  useEffect(() => {
    // Initial fetch
    fetchData()

    // Set up interval
    const interval = setInterval(fetchData, intervalMs)
    return () => clearInterval(interval)
  }, [fetchData, intervalMs])

  return { data, isLoading, lastUpdated, error, refetch: fetchData }
}
