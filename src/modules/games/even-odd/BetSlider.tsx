'use client';

import React from 'react';

interface BetSliderProps {
  value: number;
  max: number;
  onChange: (val: number) => void;
}

const BetSlider: React.FC<BetSliderProps> = ({ value, max, onChange }) => {
  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <input
        type="range"
        min={10}
        max={max}
        step={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
      <span className="text-sm font-medium text-gray-700">
        Bet: {value}
      </span>
    </div>
  );
};

export default BetSlider;
