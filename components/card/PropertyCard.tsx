import { PropertyCardType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/format";
import PropertyRatings from "./PropertyRatings";
import FavoriteToggleButton from "./FavoriteToggleButton";
import CountryDetails from "./CountryDetails";

function PropertyCard({ property }: { property: PropertyCardType }) {
  const { id: propertyId, name, price, image, country, tagline, city } = property;
  const formattedPrice = formatCurrency(price);

  return (
    <article className='relative bg-[#f2f2f2] rounded-md'>
      <Link href={`/properties/${propertyId}`}>
        <div className='relative h-64 overflow-hidden rounded-md'>
          <Image
            src={property.image}
            alt={property.name}
            fill
            className='w-full h-full object-cover rounded-md transform hover:scale-110 transition-transform duration-500'
          />
        </div>
        <div className='p-4'>
          <div className="flex justify-between items-center mb-2">
          <p className="bg-primary px-2 py-2 text-sm font-medium tracking-wide text-white inline-block rounded-md">{city}</p>
          <PropertyRatings inPage={false} propertyId={propertyId} />
          </div>
          <h3 className='text-base font-semibold mt-1 tracking-wide'>
            {name.substring(0, 30)}
          </h3>
        <p className='text-sm text-muted-foreground min-h-8 md:min-h-10'>{tagline.substring(0, 40)}</p>
        
        <div className='flex justify-between items-center mt-4'>
          <p className='text-sm font-semibold'>
            {" "}
            <span>{formattedPrice}</span> night
          </p>
          <CountryDetails code={country} />
        </div>
        </div>
      </Link>
    </article>
  );
}

export default PropertyCard;
