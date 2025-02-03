import React from "react";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";

function Navbar() {
  return (
    <nav className='bg-[#f2f2f2] dark:bg-black'>
      <div className='alignment flex flex-col md:flex-row md:justify-between md:items-center py-6 gap-y-3'>
        <Logo />
        <NavSearch />
        <div className='mt-2 flex gap-x-4 items-center md:mt-0'>
          <DarkMode />
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
