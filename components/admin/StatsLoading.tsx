import { Skeleton } from "../ui/skeleton"


export const StatsLoading = () => {


return <div className="grid gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
<StatsSkeleton />
<StatsSkeleton />
<StatsSkeleton />
</div>
}

function StatsSkeleton() {

 return <Skeleton className="w-full h-20 rounded" />
}

