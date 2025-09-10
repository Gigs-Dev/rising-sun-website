import Card from '@/modules/games/guess/Card';
import React from 'react'

const GuessPage = () => {
  return (
    <div className='flex min-h-screen flex-col gap-3 p-1 w-[390px] md:w-[520px] mx-auto'>
        {/* <div className='flex flex-col w-full h-full rounded-md bg-[#0a9737] border-[10px] border-[#0a7879] p-1'> */}
        <Card/>
        {/* </div> */}
    </div>
  )
}

export default GuessPage;
