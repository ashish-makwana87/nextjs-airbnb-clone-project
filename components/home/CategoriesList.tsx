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
      <div className='flex gap-x-4 md:gap-x-10'>
        {categories.map((item) => {
          const isActive = item.label === category;

          return (
            <Link
              href={`/?category=${item.label}${searchTerm}`}
              key={item.label}
            >
              <article
                className={`p-2 flex flex-col items-center cursor-pointer duration-300 hover:text-primary ${
                  isActive ? "text-primary" : ""
                }`}
              >
                <h4 className='capitalize text-sm md:text-base'>
                  {item.label}
                </h4>
              </article>
            </Link>
          );
        })}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}

export default CategoriesList;
