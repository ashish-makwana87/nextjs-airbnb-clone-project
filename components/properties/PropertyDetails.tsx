

type DetailsObject = {
  bedrooms: number;
  baths: number;
  beds: number;
  guests: number;
};

function PropertyDetails({ details }: { details: DetailsObject }) {
  
  const {bedrooms, baths, beds, guests } = details;

  return <div className="mt-1 md:mt-2 flex flex-wrap gap-x-1 text-sm items-center">
   <p>{bedrooms > 1 ? `${bedrooms} bedrooms |` : `${bedrooms} bedroom |`}</p>
   <p>{baths > 1 ? `${baths} baths |` : `${baths} bath |`}</p>
   <p>{beds > 1 ? `${beds} beds |` : `${beds} bed |`}</p>
   <p>{guests > 1 ? `${guests} guests` : `${guests} guest`}</p>
  </div>;
} 

export default PropertyDetails;
