import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <div>
      <Link href='/' className='text-2xl text-gray-200 md:text-3xl font-bold'>
        Properties
      </Link>
    </div>
  );
}

export default Logo;
