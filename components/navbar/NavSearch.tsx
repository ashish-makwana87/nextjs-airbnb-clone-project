import React from "react";
import { Input } from "../ui/input";

function NavSearch() {
  return (
    <Input
      type='search'
      placeholder='search properties'
      className='max-w-xs border-2 border-[#6c6c6c] outline-none dark:bg-muted'
    />
  );
}

export default NavSearch;
