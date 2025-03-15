import Image from 'next/image'
import React from 'react'

function ImageContainer({image, name}:{image:string, name:string}) {

  return (
    <div className='mt-4 md:mt-6'>
     <Image src={image} width={2000} height={2000} alt={name} className='h-72 md:h-[24rem] lg:h-[28rem] w-full rounded object-cover' />
    </div>
  )
}

export default ImageContainer