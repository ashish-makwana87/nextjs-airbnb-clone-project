import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { categories } from "@/utils/categories";
import Link from "next/link";


function CategoriesList({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const searchTerm = search ? `&search=${search}` : "";

  return (
    <ScrollArea className='py-6 mb-4 md:mb-6'>
      <div className='flex gap-x-2 md:gap-x-4 flex-wrap'>
        {categories.map((item) => {
          const isActive = item.label === category;

          return (
            <Link
              href={`/?category=${item.label}${searchTerm}`}
              key={item.label}
            >
              <div
                className={`py-2 px-3 rounded-md cursor-pointer duration-300 ${
                  isActive ? "text-white bg-primary" : "text-white bg-[#222222]"
                }`}
              >
                <h4 className='capitalize text-sm md:text-base'>
                  {item.label}
                </h4>
              </div>
            </Link>
          );
        })}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}

export default CategoriesList;
