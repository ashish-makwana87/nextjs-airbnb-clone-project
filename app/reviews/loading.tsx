import { Skeleton } from "@/components/ui/skeleton";

function loading() {


  return (
    <section className='alignment my-10 md:my-20'>
      <h3 className='head-2 mb-4 md:mb-6'>Your Reviews</h3>
      <div className='grid gap-4 md:grid-cols-2'>
        <ReviewSkeletonCard />
        <ReviewSkeletonCard />
        <ReviewSkeletonCard />
        <ReviewSkeletonCard />
      </div>
    </section>
  );
}

function ReviewSkeletonCard() {
  return (
    <div className='flex items-center space-x-4 border rounded-md p-4 shadow'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
    </div>
  );
}

export default loading;
