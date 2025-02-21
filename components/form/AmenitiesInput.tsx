"use client";
import { amenities, Amenity } from "@/utils/amenities";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

function AmenitiesInput({ defaultValue }: { defaultValue?: Amenity[] }) {
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
    defaultValue || amenities
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

  return <section>
    <input name="amenities" type="hidden" value={JSON.stringify(selectedAmenities)} />
    <div className="grid md:grid-cols-2 gap-4 mt-6 mb-4">
    {selectedAmenities.map((amenity) => {
    
    return <div key={amenity.name} className="flex items-center gap-x-2">
    <Checkbox id={amenity.name} checked={amenity.selected} onCheckedChange={() => handleChange(amenity)} />
      <Label htmlFor={amenity.name} className="capitalize flex gap-x-2 items-center" >{amenity.name}<amenity.icon /></Label>
    </div>

    })}
    </div>
  </section>;
}

export default AmenitiesInput;
