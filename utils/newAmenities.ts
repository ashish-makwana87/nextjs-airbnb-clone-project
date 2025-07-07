import { IconType } from "react-icons";

export type Amenity = {
  name: string;
  selected: boolean;
};

export const newAmenities: Amenity[] = [
  { name: "air conditioning", selected: false },
  { name: "hot shower", selected: false },
  { name: "flat-screen TV", selected: false },
  { name: "mini-fridge or minibar", selected: false },
  { name: "electric kettle", selected: false },
  { name: "desk or work area", selected: false },
  { name: "free wi-fi", selected: false },
  { name: "private bathroom", selected: false },
  { name: "heating", selected: false },
  { name: "in-room safe", selected: false },
  { name: "bed linens", selected: false },
  { name: "towels", selected: false },
  { name: "wardrobe/closet", selected: false },
  { name: "hairdryer", selected: false },
  { name: "iron and ironing board", selected: false },
  { name: "cooking utensils", selected: false },
  { name: "complimentary toiletries", selected: false },
  { name: "swimming pool", selected: false },
  { name: "garden or terrace", selected: false },
  { name: "room service", selected: false },
];
