import Footer from '@/ui/components/Footer';
import Header from '@/ui/components/Header';
import React from 'react';

export const metadata = {
    title: "Rising Sun - Games",
    description: "Play more, win more",
  };

const GamesLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex flex-col min-h-screen gap-0 w-full'>
        <Header/>
        <div className="mt-[100px]">
          {children}
        </div>
        <Footer/>
    </div>
  )
}

export default GamesLayout;
