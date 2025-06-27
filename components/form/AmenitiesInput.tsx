"use client";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { newAmenities, Amenity } from "@/utils/newAmenities";

function AmenitiesInput({ defaultValue }: { defaultValue?: Amenity[] }) {
  const presentAmenities = defaultValue?.map(({ name, selected }) => {
    return {
      name,
      selected,
    };
  });

  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
    presentAmenities || newAmenities
  );

  const handleChange = (amenity: Amenity) => {
    setSelectedAmenities((prev) => {
      return prev.map((a) => {
        if (a.name === amenity.name) {
          return { ...a, selected: !a.selected };
        }

        return a;
      });
    });
  };

  return (
    <section>
      <input
        type='hidden'
        name='amenities'
        value={JSON.stringify(selectedAmenities)}
      />
      <div className='grid grid-cols-2 gap-4'>
        {selectedAmenities.map((amenity) => {
          return (
            <div key={amenity.name} className='flex items-center space-x-2'>
              <Checkbox
                id={amenity.name}
                checked={amenity.selected}
                onCheckedChange={() => handleChange(amenity)}
              />
              <label
                htmlFor={amenity.name}
                className='text-sm font-medium leading-none capitalize flex gap-x-2 items-center'
              >
                {amenity.name}
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AmenitiesInput;
