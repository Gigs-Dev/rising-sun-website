import Needle from '@/modules/games/needle/NeedleModule';
import NeedleBottom from '@/modules/games/needle/Box';
import React from 'react'
import Balance from '@/modules/games/needle/Balance';

const NeedlePage = () => {
  return (
    <div className="flex flex-col gap-3 p-1 w-[420px] mx-auto">
      <div className='flex flex-col w-full rounded-md bg-[#0a9737] border-[10px] border-[#0a7879] p-1'>
        <Balance/>
        <Needle/>
        <NeedleBottom/>
      </div>
    </div>
  )
}

export default NeedlePage;


// #17a2b8