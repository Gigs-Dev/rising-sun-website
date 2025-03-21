import React from 'react'

const NeedleBottom = () => {
  return (
    <div className='flex flex-col'>
        <div className="flex items-center h-[100px]">
            <span className="">Bet:</span>
            <input type="number" className="" min={0}/>
        </div>
    </div>
  )
}

export default NeedleBottom;
