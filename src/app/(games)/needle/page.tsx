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
  const [shouldRotate, setShouldRotate] = useState(false);
  const [reset, setReset] = useState(false);

  
  const handleChooseDown = () => {
    setDown(true);
    setShouldRotate(true);
    setReset(true);
    console.log(down)
  }


  const handleChooseUp = () => {
    setUp(true);
    setShouldRotate(true);
    setReset(true);
    console.log(up);
  }


  const handleReset = () => {
    setReset(false);
    setShouldRotate(false);
  }


  return (
    <div className="flex flex-col gap-3 p-1 w-[360px] md:w-[420px] mx-auto">
      <div className='flex flex-col w-full rounded-md bg-[#0a9737] border-[10px] border-[#0a7879] p-1'>
        <Balance/>
        <Needle setUp={setUp} setDown={setDown} shouldRotate={shouldRotate}/>
        <NeedleBottom/>
      </div>

      <div className="flex items-center w-full">
        <StakeButtons className={reset ? 'bg-[#4f17b8]' : 'bg-[#17a2b8]'} text={reset ? 'Reset':  'UP'} onClick={reset ? handleReset : handleChooseUp} />
        <StakeButtons className={reset ? 'bg-[#b817a3]' : 'bg-[#17e3b2]'} text={reset ? 'Play Again': 'DOWN'} onClick={reset ? handleReset : handleChooseDown} />
      </div>
    </div>
  )
}

export default NeedlePage;


