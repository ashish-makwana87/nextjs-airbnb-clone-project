import { fetchAllProperties } from '@/utils/actions'
import { PropertyCardType } from '@/utils/types'
import EmptyList from './EmptyList'
import PropertiesList from './PropertiesList'


async function PropertiesContainer({category, search}: {category?:string, search?:string}) {

 const properties:PropertyCardType[] = await fetchAllProperties({category, search})
  
 
 if(properties.length === 0) {
  return <EmptyList title='No properties found...' message='Try changing or removing filters.' btnText='clear filters' />
 }

  return <PropertiesList properties={properties} />
}

export default PropertiesContainer;