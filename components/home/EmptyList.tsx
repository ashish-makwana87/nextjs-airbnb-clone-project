import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function EmptyList({title = 'No items in the list', message = 'Keep exploring our properties', btnText = 'back home', className}: {title?: string, message?: string, btnText?: string, className?:string}) {


  return (
    <div className={`${className} mt-4`}>
    <h1 className='head-1 capitalize'>{title}</h1>
    <p className='mt-2 text-lg'>{message}</p>
    <Button asChild className=' capitalize text-base mt-6' size='lg'>
     <Link href='/'>{btnText}</Link> 
    </Button>
    </div>
  )
}

export default EmptyList