import React from 'react';

export const metadata = {
    title: "Rising Sun - Games",
    description: "Play more, win more",
  };

const GamesLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex flex-col'>
        <div className="">{children}</div>
    </div>
  )
}

export default GamesLayout;
