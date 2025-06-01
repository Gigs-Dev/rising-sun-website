import { Span } from '@/ui/primitives/typography';
import React from 'react'
import StakeBox from './StakeBox';

const NeedleBox = () => {
  return (
    <div className='flex flex-col w-full'>
      <Span className='text-center m-1 italic' text='Pays 2x, lose when it stops at neutral' />
      <StakeBox/>
    </div>
  )
}

export default NeedleBox;
