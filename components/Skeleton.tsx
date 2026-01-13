export function MetricSkeleton() {
  return (
    <div className="text-center">
      <div className="h-[clamp(1.5rem,2.5vw,3rem)] w-[clamp(12rem,20vw,20rem)] skeleton rounded mx-auto mb-vw" />
      <div className="h-[clamp(8rem,15vw,20rem)] w-[clamp(20rem,40vw,50rem)] skeleton rounded-lg mx-auto mb-vw" />
      <div className="h-[clamp(2rem,3vw,4rem)] w-[clamp(8rem,15vw,16rem)] skeleton rounded-full mx-auto" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-vw">
        <div>
          <div className="h-[clamp(1rem,1.2vw,1.5rem)] w-[clamp(8rem,12vw,14rem)] skeleton rounded mb-2" />
          <div className="h-[clamp(0.6rem,0.8vw,1rem)] w-[clamp(4rem,6vw,8rem)] skeleton rounded" />
        </div>
        <div className="h-[clamp(0.6rem,0.8vw,1rem)] w-[clamp(6rem,8vw,10rem)] skeleton rounded" />
      </div>
      <div className="h-vw-chart flex items-end justify-between gap-vw px-vw pt-8">
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
    <div className="h-screen w-screen marble-bg flex flex-col">
      {/* Header skeleton */}
      <header className="border-b border-border px-vw py-vw bg-white/80 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-vw">
            <div className="w-[clamp(2rem,3vw,4rem)] h-[clamp(2rem,3vw,4rem)] skeleton rounded-full" />
            <div className="h-[clamp(1.5rem,2.5vw,3rem)] w-[clamp(5rem,8vw,10rem)] skeleton rounded" />
          </div>
          <div className="h-[clamp(1rem,1.2vw,1.5rem)] w-[clamp(8rem,10vw,14rem)] skeleton rounded" />
        </div>
      </header>

      <main className="flex-1 flex flex-col px-vw py-vw min-h-0 overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center min-h-0">
          <MetricSkeleton />
        </div>
        <div className="shrink-0 bg-white rounded-vw shadow-card border border-border p-vw max-w-vw-chart mx-auto w-full">
          <ChartSkeleton />
        </div>
      </main>
    </div>
  )
}
