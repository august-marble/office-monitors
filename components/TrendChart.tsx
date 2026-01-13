'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

interface TrendChartProps {
  title: string
  subtitle?: string
  data: { date: string; value: number }[]
  color?: string
  compact?: boolean
}

export function TrendChart({ title, subtitle, data, color = '#144C82', compact = false }: TrendChartProps) {
  // Split data into complete weeks and partial (current) week
  const chartData = data.map((item, index) => ({
    ...item,
    complete: index < data.length - 1 ? item.value : undefined,
    partial: index >= data.length - 2 ? item.value : undefined,
  }))

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-vw mb-vw">
        <div>
          <h3 className="text-text-primary font-semibold text-vw-body">{title}</h3>
          {subtitle && (
            <p className="text-text-muted text-vw-small">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-vw text-text-muted text-vw-small">
          <span className="flex items-center gap-2">
            <span className="w-[clamp(0.75rem,1vw,1.5rem)] h-0.5 rounded" style={{ backgroundColor: color }}></span>
            Complete
          </span>
          <span className="flex items-center gap-2">
            <span
              className="w-[clamp(0.75rem,1vw,1.5rem)] h-0.5 rounded"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, ${color} 0, ${color} 3px, transparent 3px, transparent 6px)`
              }}
            ></span>
            Current week
          </span>
        </div>
      </div>
      <div className="h-vw-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.12} />
                <stop offset="100%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="#8A9BA8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              dy={8}
            />
            <YAxis
              stroke="#8A9BA8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
              width={45}
              dx={-8}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5EAEE',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(20, 30, 36, 0.08)',
                color: '#141E24',
                padding: '12px 16px',
              }}
              labelStyle={{
                color: '#5A6872',
                fontSize: '12px',
                marginBottom: '4px',
              }}
              formatter={(value: number, name: string) => [
                <span key="value" className="font-semibold">{value.toLocaleString()}</span>,
                name === 'partial' ? 'Current week (partial)' : 'Users',
              ]}
            />
            {/* Filled area for complete weeks */}
            <Area
              type="monotone"
              dataKey="complete"
              stroke={color}
              strokeWidth={2}
              fill="url(#colorGradient)"
              connectNulls={false}
              dot={false}
              activeDot={{ r: 5, fill: color, stroke: '#fff', strokeWidth: 2 }}
            />
            {/* Dashed line for partial/current week */}
            <Area
              type="monotone"
              dataKey="partial"
              stroke={color}
              strokeWidth={2}
              strokeDasharray="6 4"
              fill="none"
              connectNulls={false}
              dot={false}
              activeDot={{ r: 5, fill: color, stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
