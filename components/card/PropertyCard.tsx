import { PropertyCardType } from '@/utils/types';
import { Card, CardHeader } from '../ui/card';
import Image from 'next/image';
import Link from 'next/link';

function PropertyCard({property}:{property: PropertyCardType}) {

  const {id: propertyId, name, price, image, country, tagline} = property;

  return (
   <article className='relative'>
    <Link href={`/properties/${propertyId}`}>
    <div className='h-[300px] overflow-hidden rounded-md'>
   <Image src={property.image} width={500} height={500} alt={property.name} className='w-full h-full object-cover rounded-md transform hover:scale-110 transition-transform duration-500' />
    </div>
    <div>

    </div>
    </Link>
   </article>
   
 
  )
}

export default PropertyCard