import { Span } from '@/ui/primitives/typography';
import React from 'react';

interface Props {
  onSizeChange: (val: number) => void;
}

const CardSize: React.FC<Props> = ({ onSizeChange }) => {
  return (
    <div className="flex items-center gap-2 justify-end">
      <Span text="Select Box Size:" className="text-[20px]" />

      <select
        defaultValue={4}
        className="bg-transparent border rounded px-2 py-1"
        onChange={(e) => onSizeChange(Number(e.target.value))}
      >
        <option value={2} className='bg-[#2b1a5e] cursor-pointer'>4 cards</option>
        <option value={3} className='bg-[#2b1a5e] cursor-pointer'>9 cards</option>
        <option value={4} className='bg-[#2b1a5e] cursor-pointer'>16 card</option>
        <option value={5} className='bg-[#2b1a5e] cursor-pointer'>25 cards</option>
      </select>
    </div>
  );
};

export default CardSize;
