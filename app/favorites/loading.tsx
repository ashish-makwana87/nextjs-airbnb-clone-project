'use client'
import LoadingCards from '@/components/card/LoadingCards'

function loading() {
  return (
   <div className='alignment my-10 md:my-20'>
    <h2 className="head-2 capitalize mb-10">favorite properties</h2>
    <LoadingCards />
   </div>
  )
}

export default loading