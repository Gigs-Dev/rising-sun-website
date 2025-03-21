import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='w-full h-[70px]'>
        <div className="mx-auto flex items-center max-w-[1024px] w-full border-x-[0.1px] border-b-[0.1px] rounded-b-2xl h-full px-2 gap-5">
            <Link href='/' className="">Back to Home</Link>

            <div className="flex items-center gap-4">
                <span className="">Love</span>
                <span className="">Love</span>
                <span className="">Love</span>
            </div>
        </div>
    </div>
  )
}

export default Navbar;
