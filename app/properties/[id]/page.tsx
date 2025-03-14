import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyBreadCrumbs from "@/components/properties/BreadCrumbs";
import ShareButton from "@/components/properties/ShareButton";
import { fetchPropertyDetails } from "@/utils/actions";
import { redirect } from "next/navigation";

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await fetchPropertyDetails(params.id);

  if (!property) redirect("/");

  return (
    <section className='alignment my-10 md:my-20'>
      <PropertyBreadCrumbs name={property.name} />
      <header className='flex justify-between items-center mt-2 md:mt-6'>
        <h1 className='head-2 capitalize'>{property.tagline}</h1>
        <div className='flex items-center gap-x-2'>
          <ShareButton name={property.name} propertyId={property.id} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
    </section>
  );
}

export default PropertyDetailsPage;
