export function MetricSkeleton() {
  return (
    <div className="text-center">
      <div className="h-8 w-64 skeleton rounded mx-auto mb-6" />
      <div className="h-48 md:h-64 lg:h-80 w-[500px] md:w-[700px] lg:w-[900px] skeleton rounded-lg mx-auto mb-8" />
      <div className="h-12 w-48 skeleton rounded-full mx-auto" />
    </div>
  )
}

export function ChartSkeleton({ compact = false }: { compact?: boolean } = {}) {
  return (
    <div>
      <div className={`flex items-baseline justify-between ${compact ? 'mb-3' : 'mb-6'}`}>
        <div>
          <div className={`${compact ? 'h-5 w-36' : 'h-6 w-48'} skeleton rounded mb-2`} />
          <div className={`${compact ? 'h-3 w-20' : 'h-4 w-24'} skeleton rounded`} />
        </div>
        <div className={`${compact ? 'h-3 w-24' : 'h-4 w-32'} skeleton rounded`} />
      </div>
      <div className={`${compact ? 'h-32' : 'h-56 sm:h-64 md:h-72'} flex items-end justify-between gap-3 px-4 pt-8`}>
        {/* Fake area chart skeleton */}
        {[35, 45, 55, 40, 60, 50, 70, 65, 75, 55, 80, 60].map((height, i) => (
          <div
            key={i}
            className="flex-1 skeleton rounded-t"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen marble-bg">
      {/* Header skeleton */}
      <header className="border-b border-border px-6 py-4 bg-white/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 skeleton rounded-full" />
            <div className="h-6 w-20 skeleton rounded" />
          </div>
          <div className="h-4 w-32 skeleton rounded" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <MetricSkeleton />
        </div>
        <div className="bg-white rounded-2xl shadow-card border border-border p-6 sm:p-8">
          <ChartSkeleton />
        </div>
      </main>
    </div>
  )
}
