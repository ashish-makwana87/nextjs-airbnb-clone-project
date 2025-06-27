import { findCountryByCode } from '@/utils/countries'
import React from 'react'

function CountryDetails({code}:{code: string}) {
 
 const country = findCountryByCode(code)!;
 
 const countryName = country.name.length > 20 ? `${country.name.substring(0, 20)}` : country.name

  return (
    <div className='flex items-center gap-x-1 text-sm'>
     <p>{countryName}</p>
     </div>
  )
}

export default CountryDetails;