import { Skeleton } from '../ui/skeleton'


function LoadingTable({rows}:{rows?: number}) {

 const tableSkeleton = Array.from({length: rows || 5 }, (_, i) => {

  return <div key={i} className='mb-4'>
   <Skeleton className='w-full h-8 rounded' />
  </div>
 })


  return (
    <div>{tableSkeleton}</div>
  )
}

export default LoadingTable