import TextField from '@/ui/primitives/TextField';
import { Span } from '@/ui/primitives/typography';
import React from 'react'

const StakeBox = () => {
  return (
    <div className='flex items-center mx-auto w-[170px] border-[0.1px] border-[#999] gap-4 p-1'>
        <Span text='Stake:' className='text-[12px]'/>
        <TextField type='tel' className='bg-transparent' placeholder=''/>
    </div>
  )
}

export default StakeBox;
