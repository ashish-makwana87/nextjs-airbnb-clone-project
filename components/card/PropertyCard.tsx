import { PropertyCardType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/format";

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
        <div className='px-2 mt-3'>
          <p className='text-sm'>reviews</p>
          <h3 className='text-sm font-semibold mt-1 tracking-wide'>
            {name.substring(0, 30)}
          </h3>
        </div>
        <p className='text-sm px-2'>{tagline.substring(0, 40)}</p>
        <div className='flex justify-between items-center mt-4 px-2'>
          <p className='text-sm font-semibold'>
            {" "}
            <span>{formattedPrice}</span>/night
          </p>
          <p className='text-sm'>Country</p>
        </div>
      </Link>
    </article>
  );
}

export default PropertyCard;
