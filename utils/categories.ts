import { IconType } from "react-icons/lib";
import { MdCabin } from "react-icons/md";

import { TbCaravan, TbTent, TbBuildingCottage } from "react-icons/tb";
import { TbBeach } from "react-icons/tb";
import { GiWoodCabin, GiMushroomHouse } from "react-icons/gi";
import { PiWarehouse, PiVan } from "react-icons/pi";
import { RiHome3Line } from "react-icons/ri";
import { MdOutlineBedroomParent } from "react-icons/md";

type Category = {
  label: CategoryLabel;
  icon: IconType;
};

export type CategoryLabel =
  | "cabin"
  | "tent"
  | "airstream"
  | "cottage"
  | "rooms"
  | "caravan"
  | "beachfront"
  | "magic"
  | "apartment"
  | "lodge";

export const categories: Category[] = [
  {
    label: "cabin",
    icon: MdCabin,
  },
  {
    label: "airstream",
    icon: PiVan,
  },
  {
    label: "tent",
    icon: TbTent,
  },
  {
    label: "apartment",
    icon: RiHome3Line,
  },
  {
    label: "cottage",
    icon: TbBuildingCottage,
  },
  {
    label: "magic",
    icon: GiMushroomHouse,
  },
  {
    label: "beachfront",
    icon: TbBeach,
  },
  {
    label: "caravan",
    icon: TbCaravan,
  },

  {
    label: "rooms",
    icon: MdOutlineBedroomParent,
  },
  {
    label: "lodge",
    icon: GiWoodCabin,
  },
];
