import LoadingCards from "@/components/card/LoadingCards";
import CategoriesList from "@/components/home/CategoriesList";
import EmptyList from "@/components/home/EmptyList";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { Suspense } from "react";

function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  
  return (
    <section className='alignment my-10 md:my-12'>
      <CategoriesList
        category={searchParams.category}
        search={searchParams.search}
      />
      <Suspense fallback={<LoadingCards />}>
      <PropertiesContainer
        category={searchParams.category}
        search={searchParams.search}
        />
      </Suspense>
    </section>
  );
}

export default HomePage;
