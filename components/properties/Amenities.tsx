import { Amenity } from "@/utils/newAmenities";
import { IoCheckboxOutline } from "react-icons/io5";

function Amenities({ amenities }: { amenities: string }) {
  const amenitiesList: Amenity[] = JSON.parse(amenities);

  const noneSelected = amenitiesList.every(
    (amenity) => amenity.selected === false
  );

  if (noneSelected) return null;

  return (
    <div className='mt-4'>
      <h5 className='head-5'>What this place offers</h5>
      <div className='mt-2 grid md:grid-cols-2 gap-y-2 gap-x-4'>
        {amenitiesList.map((amenity) => {
          if (!amenity.selected) return null;

          return (
            <div key={amenity.name} className='flex items-center gap-x-3'>
              <IoCheckboxOutline className='text-primary text-lg' />
              <p className=' capitalize'>{amenity.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Amenities;
