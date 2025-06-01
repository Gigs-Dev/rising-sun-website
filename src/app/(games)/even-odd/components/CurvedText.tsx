import { CurvedTextProps } from '@/types/ui';
import React from 'react';

const CurvedText = ({ text, fontSize, color, curveHeight, totalWidth, yNumber }: CurvedTextProps) => {
  const letters = text.split('');
//   const center = totalWidth / 2;

  return (
    <div className="relative w-[80px] h-[20px] flex justify-center items-center mx-auto">
      {letters.map((letter, index) => {
        const letterIndex = index - (letters.length - 1) / 2; // Center the text
        const x = letterIndex * (totalWidth! / (letters.length - 1)); // Spread across the new width
        // Subtle upward U-shape: y is negative to curve upward, adjusted for symmetry
        const y = -(Math.pow(letterIndex, 2) * (curveHeight! / ((letters.length - 1) / 2) ** 2)) / yNumber!; // Adjusted for yNumber

        return (
          <span
            key={index}
            className={`absolute font-bold uppercase text-gray-400 ${color} text-center opacity-60`}
            style={{
              transform: `translate(${x + 5}px, ${y}px)`, // Adjust center offset for new width
              fontSize: `${fontSize}px`,
            }}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default CurvedText;