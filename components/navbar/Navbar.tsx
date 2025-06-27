import React from "react";
import Logo from "./Logo";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";

function Navbar() {
  return (
    <nav className='bg-primary'>
      <div className='alignment flex justify-between items-center py-6 gap-y-3'>
        <Logo />
        <div className='mt-2 flex gap-x-4 items-center md:mt-0'>
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
