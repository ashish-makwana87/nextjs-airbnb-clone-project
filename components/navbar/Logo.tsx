import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <div>
      <Link href='/' className='text-2xl text-primary dark:text-[#f93856] md:text-3xl font-bold' >Airbnb</Link>
    </div>
  )
}

export default Logo