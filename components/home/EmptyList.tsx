import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function EmptyList({title = 'No items in the list', message = 'Keep exploring our properties', btnText = 'back home', className}: {title?: string, message?: string, btnText?: string, className?:string}) {


  return (
    <div className={`${className} mt-4`}>
    <h2 className='head-3 capitalize'>{title}</h2>
    <p className='mt-2 text-lg'>{message}</p>
    <Button asChild className=' capitalize text-base mt-6' size='lg'>
     <Link href='/'>{btnText}</Link> 
    </Button>
    </div>
  )
}

export default EmptyList