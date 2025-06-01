'use client';


import React, { useEffect, useState, Dispatch, SetStateAction, FC } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface NType {
  setUp: Dispatch<SetStateAction<boolean>>;
  setDown: Dispatch<SetStateAction<boolean>>;
  shouldRotate?: boolean;
}

const data = [
  { name: 'B', value: 80, color: '#00ff00' },
  { name: 'C', value: 80, color: '#0000ff' },
];

const cx = 150;
const cy = 175; 
const iR = 75;
const oR = 100;

const Needle: FC<NType> = ({ shouldRotate }) => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const total = data.reduce((sum, v) => sum + v.value, 0);
    const slice = data[0];
    const midValue = slice.value / 2;
    const angleToFirst = 360 * (1 - midValue / total);
    setAngle(angleToFirst);
  }, []);



  return (
    <div className="relative w-[290px] h-[350px] ml-[40px]">
      {/* Pie chart below */}
      <ResponsiveContainer width="100%" height="100%" className='relative'>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx={cx}
            cy={cy}
            startAngle={360}
            endAngle={0}
            paddingAngle={1}
            innerRadius={iR}
            outerRadius={oR}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Needle overlay */}
      <svg
        className="absolute top-[60px] left-0 bottom-0 flex m-auto pointer-events-none"
        width={400}
        height={350}
      >

          <motion.g
              animate={shouldRotate ? { rotate: 360 } : { rotate: angle }}
              initial={{ rotate: angle }}
              transition={{
                repeat: 1,
                duration: 1,
                ease: 'linear',
              }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
          <circle cx={cx} cy={cy} r={5} fill="#fff" stroke="none" />
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - 50}
            stroke="#fff"
            strokeWidth={2}
          />
          <path
            d={`M${cx},${cy - 60} L${cx - 6},${cy - 50} L${cx + 6},${cy - 50} Z`}
            fill="#fff"
          />
        </motion.g>
      </svg>
    </div>
  );
};

export default Needle;
