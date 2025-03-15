import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRatings from "@/components/card/PropertyRatings";
import BookingCalendar from "@/components/properties/BookingCalendar";
import PropertyBreadCrumbs from "@/components/properties/BreadCrumbs";
import Description from "@/components/properties/Description";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import { Separator } from "@/components/ui/separator";
import { fetchPropertyDetails } from "@/utils/actions";
import { redirect } from "next/navigation";

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await fetchPropertyDetails(params.id);

  if (!property) redirect("/");
  
  const {bedrooms, beds, baths, guests} = property;
  const details = {bedrooms, baths, beds, guests}
  const userInfo = {firstName: property.profile.firstName, image: property.profile.profileImage}

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
      <ImageContainer image={property.image} name={property.name} />
      <section className="md:grid md:grid-cols-12 gap-x-12 mt-4 md:mt-6">
        {/* property details */}
       <div className="md:col-span-8">
        <div className="flex items-center gap-x-2 md:gap-x-4">
       <h4 className="head-4 font-bold">{property.name}</h4>
       <PropertyRatings inPage={true} propertyId={property.id} />
        </div>
        <PropertyDetails details={details} />
        <UserInfo userInfo={userInfo} />
        <Separator className="mt-4" />
        <Description title="description" description={property.description} />
       </div>
       {/* calendar */}
       <div className="mt-4 md:mt-0 md:col-span-4">
        <BookingCalendar />
       </div>
      </section>
    </section>
  );
}

export default PropertyDetailsPage;
