import { Skeleton } from "@/components/ui/skeleton";


function loading() {
  return <section className='alignment py-10 md:py-20 grid gap-4 md:grid-cols-2'>
  <ReviewSkeletonCard />
  <ReviewSkeletonCard />
  <ReviewSkeletonCard />
  <ReviewSkeletonCard />
  </section>;
}


function ReviewSkeletonCard() {

  return (
    <div className='flex items-center space-x-4'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
    </div>
  );
};

export default loading;
