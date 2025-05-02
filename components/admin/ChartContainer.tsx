import { fetchChartsData } from "@/utils/actions"


 async function ChartContainer() {
 
  const bookingsData = await fetchChartsData()

  return (
    <div className="mt-8 md:mt-10">ChartContainer</div>
  )
}

export default ChartContainer