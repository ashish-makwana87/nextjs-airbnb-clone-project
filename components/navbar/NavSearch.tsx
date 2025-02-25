'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useState } from "react";
import {useDebouncedCallback} from 'use-debounce'


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
      placeholder='search properties'
      className='max-w-xs border-2 border-[#6c6c6c] outline-none dark:bg-muted'
      value={search}
      onChange={(e) => {setSearch(e.target.value); handleSearch(e.target.value)} }
    />
  );
}

export default NavSearch;
