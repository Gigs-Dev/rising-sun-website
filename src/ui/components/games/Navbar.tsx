import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='w-full h-[70px] z-20 static top-0 right-0 left-0 flex my-auto'>
        <div className="mx-auto flex items-center max-w-[1024px] w-full border-x-[0.1px] border-b-[0.1px] rounded-b-2xl h-full px-2 gap-5">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">

                    <Link href='/' className="">Back to Home</Link>
                </div>

                <div className="flex items-center gap-4">
                    <span className="">Game Collection</span>
                    <span className="">App</span>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar;
