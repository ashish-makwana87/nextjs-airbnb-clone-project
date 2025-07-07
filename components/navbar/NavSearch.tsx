'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useState } from "react";
import {useDebouncedCallback} from 'use-debounce'
import { fetchAllProperties } from "@/utils/actions";


function NavSearch() {
 
  const searchParams = useSearchParams();
  const {replace} = useRouter();
  
  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '')

  const handleSearch = useDebouncedCallback((value:string) => {
  
    const params = new URLSearchParams(searchParams);
    
    if(value) {
      params.set('search', value)
    } else {params.delete('search')}

    replace(`/?${params.toString()}`)
  }, 1500
  )  

  return (
    <Input
      type='search'
      placeholder='Search by city or property name'
      className='max-w-xs text-sm md:text-base border-[#222222] border-2 outline-none text-[#222222]'
      value={search}
      onChange={(e) => {setSearch(e.target.value); handleSearch(e.target.value)} }
    />
  );
}

export default NavSearch;
