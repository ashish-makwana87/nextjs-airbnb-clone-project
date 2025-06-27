type Category = {
  label: CategoryLabel;
};

export type CategoryLabel = "hotel" | "homestay" | "apartment" | "villa";

export const categories: Category[] = [
  {
    label: "hotel",
  },
  {
    label: "homestay",
  },
  {
    label: "apartment",
  },
  {
    label: "villa",
  },
];
