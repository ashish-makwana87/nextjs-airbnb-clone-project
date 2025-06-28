import EmptyList from "@/components/home/EmptyList";
import PropertiesList from "@/components/home/PropertiesList";
import { fetchAllFavorites } from "@/utils/actions";
import { redirect } from "next/navigation";

async function FavoritesPage() {
  const allFavorites = await fetchAllFavorites();
  

  if(!allFavorites) {throw new Error('Something went wrong')}
  

  if (allFavorites.length === 0) {

    return (
      <section className='alignment my-10 md:my-20'>
        <EmptyList
          title='No properties found...'
          message='Add some properties as favorites to appear here.'
        />
      </section>
    );
  }

  return (
    <section className='alignment py-10 md:py-20'>
      <h1 className='head-1 capitalize mb-6 md:mb-10'>favorite properties</h1>
      <PropertiesList properties={allFavorites} />
    </section>
  );
}

export default FavoritesPage;
