import { IconType } from "react-icons";

export type Amenity = {
  name: string;
  selected: boolean;
};


export const newAmenities: Amenity[] = [
  { name: "Air conditioning",  selected: false },
  { name: "hot shower",  selected: false },
  { name: "Flat-screen TV",  selected: false },
  { name: "Mini-fridge or minibar",  selected: false },
  { name: "Electric kettle",  selected: false },
  { name: "Desk or work area", selected: false },
  { name: "Free wi-fi",  selected: false },
  { name: "private bathroom",  selected: false },
  { name: "hot shower",  selected: false },
  { name: "kitchenette",  selected: false },
  { name: "heating", selected: false },
  { name: "In-room safe",  selected: false },
  { name: "bed linens",  selected: false },
  { name: "towels",  selected: false },
  { name: "Wardrobe/closet",  selected: false },
  { name: "Hairdryer",  selected: false },
  { name: "Iron and ironing board",  selected: false },
  { name: "Swimming pool",  selected: false },
  { name: "Garden or terrace",  selected: false },
  { name: "cooking utensils",  selected: false },
  { name: "Complimentary toiletries",  selected: false },
  { name: "Room service", selected: false },
];
