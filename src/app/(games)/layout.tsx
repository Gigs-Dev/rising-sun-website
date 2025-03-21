import Footer from '@/ui/components/Footer';
import Navbar from '@/ui/components/games/Navbar';
import React from 'react';

export const metadata = {
    title: "Rising Sun - Games",
    description: "Play more, win more",
  };

const GamesLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex flex-col min-h-screen gap-0 w-fit'>
        <Navbar/>
        {/* <div className="flex justify-center items-center h-full w-full md:w-1/3 xl:w-1/2 m-auto border-x-2 bg-[#0a9737]"> */}
            <div className="">{children}</div>
        {/* </div> */}
        <Footer/>
    </div>
  )
}

export default GamesLayout;
