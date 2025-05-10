import { fetchChartsData } from "@/utils/actions"
import Chart from "./Chart";


 async function ChartContainer() {
 
  const bookingsData = await fetchChartsData()
 
  if(bookingsData.length < 1) return null; 

  return (
    <div className="mt-8 md:mt-10">
      <Chart data={bookingsData} />
    </div>
  )
}

export default ChartContainer