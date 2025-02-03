import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <div>
      <Link href='/' className='text-2xl text-primary md:text-3xl font-bold'>
        Airbnb
      </Link>
    </div>
  );
}

export default Logo;
