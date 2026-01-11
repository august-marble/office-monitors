import { Dashboard } from '@/components/Dashboard'
import { fetchDashboardDataServer } from '@/lib/posthog-server'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const refreshInterval = parseInt(process.env.REFRESH_INTERVAL || '60', 10)
  const initialData = await fetchDashboardDataServer()

  return <Dashboard initialData={initialData} refreshInterval={refreshInterval} />
}
