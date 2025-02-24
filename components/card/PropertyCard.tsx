import { PropertyCardType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/format";
import PropertyRatings from "./PropertyRatings";
import FavoriteToggleButton from "./FavoriteToggleButton";
import CountryDetails from "./CountryDetails";

function PropertyCard({ property }: { property: PropertyCardType }) {
  const { id: propertyId, name, price, image, country, tagline } = property;
  const formattedPrice = formatCurrency(price);

  return (
    <article className='relative'>
      <Link href={`/properties/${propertyId}`}>
        <div className='h-[300px] overflow-hidden rounded-md'>
          <Image
            src={property.image}
            width={500}
            height={500}
            alt={property.name}
            className='w-full h-full object-cover rounded-md transform hover:scale-110 transition-transform duration-500'
          />
        </div>
        <div className='mt-3'>
          <PropertyRatings inPage={false} propertyId={propertyId} />
          <h3 className='text-base font-semibold mt-1 tracking-wide'>
            {name.substring(0, 30)}
          </h3>
        </div>
        <p className='text-sm text-muted-foreground'>{tagline.substring(0, 40)}</p>
        <div className='flex justify-between items-center mt-4'>
          <p className='text-sm font-semibold'>
            {" "}
            <span>{formattedPrice}</span> night
          </p>
          <CountryDetails code={country} />
        </div>
      </Link>
      <div className="absolute right-3 top-3 z-10">
      <FavoriteToggleButton />
      </div>
    </article>
  );
}

export default PropertyCard;
