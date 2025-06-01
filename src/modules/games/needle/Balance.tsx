import { Span } from '@/ui/primitives/typography';
import React from 'react'

const Balance = () => {
  return (
    <div className='flex flex-col gap-1 p-2'>
        <div className="flex items-center gap-2">
            <Span text='Bal:' className=''/>
            <Span text='NGN230,000' className=''/>
        </div>
    </div>
  )
}

export default Balance;
