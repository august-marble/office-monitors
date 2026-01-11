interface LiveCounterProps {
  title: string
  value: number
}

export function LiveCounter({ title, value }: LiveCounterProps) {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 relative">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse-dot" />
        <span className="text-green-500 text-sm font-medium uppercase tracking-wide">
          Live
        </span>
      </div>
      <h3 className="text-gray-400 text-lg font-medium mb-2">{title}</h3>
      <div className="text-7xl lg:text-8xl font-bold text-green-400 tabular-nums">
        {value.toLocaleString()}
      </div>
      <p className="mt-2 text-gray-500 text-sm">Active in last 5 minutes</p>
    </div>
  )
}
