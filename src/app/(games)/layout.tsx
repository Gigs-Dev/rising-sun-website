import Footer from '@/ui/components/Footer';
import Navbar from '@/ui/components/games/Navbar';
import React from 'react';

export const metadata = {
    title: "Rising Sun - Games",
    description: "Play more, win more",
  };

const GamesLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex flex-col min-h-screen gap-0 w-full'>
        <Navbar/>
        {children}
        <Footer/>
    </div>
  )
}

export default GamesLayout;
