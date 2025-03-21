import React, { FC } from 'react'
import { Span } from '@/ui/primitives/typography';

type IStake = {
    className: string;
    text: string;
    onClick?: () => void;
}

const StakeButtons:FC<IStake> = ({className, onClick, text}) => {
  return (
    <div onClick={onClick} className={`flex flex-col gap-[2px] w-full p-2 justify-center items-center cursor-pointer ${className}`}>
        <Span text={text} className='text-[16px] font-semibold'/>
        <Span text='Pays 2x' className='text-sm font-[400]'/>
    </div>
  )
}

export default StakeButtons;
