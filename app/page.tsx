import CategoriesList from "@/components/home/CategoriesList";
import EmptyList from "@/components/home/EmptyList";
import PropertiesContainer from "@/components/home/PropertiesContainer";

function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  return (
    <section className='alignment my-10 md:my-12'>
      <EmptyList />
      <CategoriesList
        category={searchParams.category}
        search={searchParams.search}
      />
      <PropertiesContainer
        category={searchParams.category}
        search={searchParams.search}
      />
    </section>
  );
}

export default HomePage;
