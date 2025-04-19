import { fetchStats } from "@/utils/actions"
import StatsCard from "./StatsCard"


async function StatsContainer() {
 
  const appStats = await fetchStats()

  return (
    <section className="grid gap-4 md:gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
    <StatsCard title='Users' value={appStats.totalUsers} />
    <StatsCard title='Properties' value={appStats.totalProperties} />
    <StatsCard title='Bookings' value={appStats.totalBookings} />
    </section>
  )
}

export default StatsContainer