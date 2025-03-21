import Needle from '@/modules/games/needle/NeedleModule';
import NeedleBottom from '@/modules/games/needle/NeedleBottom';
import React from 'react'

const NeedlePage = () => {
  return (
    <div className='flex flex-col mx-auto w-[420px] rounded-md bg-[#0a9737] border-[10px] border-[#0a7879]'>
      <Needle/>
      <NeedleBottom/>
    </div>
  )
}

export default NeedlePage;


// #17a2b8