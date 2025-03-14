import { Skeleton } from '../ui/skeleton';


function LoadingCards() {

  return (
    <section className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
    </section>
  )
}

function SkeletonCard() {
 
 return <div>
 <Skeleton className='h-[300px] rounded-md' />
 <Skeleton className='h-4 w-3/4 mt-2 rounded-md' />
 <Skeleton className='h-4 w-3/4 mt-2 rounded-md' />
 </div>
}

export default LoadingCards;