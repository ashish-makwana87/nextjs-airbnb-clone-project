import EmptyList from "@/components/home/EmptyList";
import PropertiesList from "@/components/home/PropertiesList";
import { fetchAllFavorites } from "@/utils/actions";

async function FavoritesPage() {
  const allFavorites = await fetchAllFavorites();

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
      <h2 className='head-2 capitalize mb-10'>favorite properties</h2>
      <PropertiesList properties={allFavorites} />
    </section>
  );
}

export default FavoritesPage;
