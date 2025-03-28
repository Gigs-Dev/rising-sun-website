'use client';

import { useState } from 'react';
import Needle from '@/modules/games/needle/NeedleModule';
import NeedleBottom from '@/modules/games/needle/Box';
import React from 'react'
import Balance from '@/modules/games/needle/Balance';
import StakeButtons from '@/modules/games/needle/StakeButtons';



const NeedlePage = () => {

  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);


  const handleChooseDown = () => {
    console.log(down)
  }


  const handleChooseUp = () => {
    console.log(up)
  }
 

  return (
    <div className="flex flex-col gap-3 p-1 w-[360px] md:w-[420px] mx-auto">
      <div className='flex flex-col w-full rounded-md bg-[#0a9737] border-[10px] border-[#0a7879] p-1'>
        <Balance/>
        <Needle setUp={setUp} setDown={setDown}/>
        <NeedleBottom/>
      </div>

      <div className="flex items-center w-full">
        <StakeButtons className='bg-[#17a2b8]' text='UP' onClick={handleChooseUp} />
        <StakeButtons className='bg-[#17e3b2]' text='DOWN' onClick={handleChooseDown} />
      </div>
    </div>
  )
}

export default NeedlePage;


// #17a2b8