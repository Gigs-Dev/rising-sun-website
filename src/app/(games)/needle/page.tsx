import Needle from '@/pages/games/needle/needle';
import NeedleBottom from '@/pages/games/needle/NeedleBottom';
import React from 'react'

const NeedlePage = () => {
  return (
    <div className='flex flex-col m-auto'>
      <Needle/>
      <NeedleBottom/>
    </div>
  )
}

export default NeedlePage;
