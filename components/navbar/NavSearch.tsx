'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useState } from "react";

function NavSearch() {
 
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const {replace} = useRouter();

  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '')

  const handleSearch = (value:string) => {
  
    const params = new URLSearchParams(searchParams)
    
    if(value) {
      params.set('search', value)
    } else {params.delete('search')}

    replace(`${pathName}?${params.toString()}`)
  }

  return (
    <Input
      type='search'
      placeholder='search properties'
      className='max-w-xs border-2 border-[#6c6c6c] outline-none dark:bg-muted'
      value={search}
      onChange={(e) => {setSearch(e.target.value); handleSearch(e.target.value)} }
    />
  );
}

export default NavSearch;
