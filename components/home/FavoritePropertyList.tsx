import { PropertyCardType } from '@/utils/types'
import PropertyCard from '../card/PropertyCard'
import FavoritePropCard from '../card/FavoritePropCard';

function FavoritePropertyList({properties}: {properties: PropertyCardType[]}) {

  return (
    <section className='grid gap-6 md:grid-cols-2  lg:grid-cols-3'>
    {properties.map((property) => {
    
    return <FavoritePropCard key={property.id} property={property} />
    })}

    </section>
  )
}

export default FavoritePropertyList;