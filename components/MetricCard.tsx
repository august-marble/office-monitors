interface MetricCardProps {
  title: string
  value: number
  trend?: number
  format?: 'number' | 'percentage' | 'currency'
}

function formatValue(value: number, format: string): string {
  switch (format) {
    case 'percentage':
      return `${value.toFixed(1)}%`
    case 'currency':
      return `$${value.toLocaleString()}`
    default:
      return value.toLocaleString()
  }
}

export function MetricCard({ title, value, trend, format = 'number' }: MetricCardProps) {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
      <h3 className="text-gray-400 text-lg font-medium mb-2">{title}</h3>
      <div className="text-6xl lg:text-7xl font-bold text-white tabular-nums">
        {formatValue(value, format)}
      </div>
      {trend !== undefined && (
        <div
          className={`mt-2 text-xl font-medium ${
            trend >= 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}% vs yesterday
        </div>
      )}
    </div>
  )
}
