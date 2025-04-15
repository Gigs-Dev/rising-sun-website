'use client';

import React, { useEffect, useState, Dispatch, SetStateAction, FC } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';


interface NType {
    setUp: Dispatch<SetStateAction<boolean>>;
    setDown: Dispatch<SetStateAction<boolean>>;
}


// const RADIAN = Math.PI / 360;
const data = [
  { name: 'B', value: 80, color: '#00ff00' },
  { name: 'C', value: 80, color: '#0000ff' },
];


const cx = 150; // Center X
const cy = 200; // Center Y
const iR = 75; // Inner Radius
const oR = 100; // Outer Radius





const Needle:FC<NType> = ({setDown, setUp}) => {


    const [value, setValue] = useState(0); 
    const [angle, setAngle] = useState(0); 
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const total = data.reduce((sum, v) => sum + v.value, 0);
        const newAngle = 360 * (1 - value / total);
        setAngle(newAngle);
        setIsClient(true); 
    }, [value]);

    if (!isClient) return null;


    // console.log(setUp, setDown);


    const startRotation = () => {
      setValue((Math.random() * 100))
    }

    // const total = data.reduce((sum, v) => sum + v.value, 0);
    // const angle = 360.0 * (1 - value / total);
    // const length = (iR + 2 * oR) / 3;
    // const sin = Math.sin(-RADIAN * angle);
    // const cos = Math.cos(-RADIAN * angle);
    // const r = 5;
    // const x0 = cx;
    // const y0 = cy;
    // const xba = x0 + r * sin;
    // const yba = y0 - r * cos;
    // const xbb = x0 - r * sin;
    // const ybb = y0 + r * cos;
    // const xp = x0 + length * cos;
    // const yp = y0 + length * sin;


  return (
    <div className="w-[400px] h-[350px] ml-[40px]">
         <ResponsiveContainer width="100%" height="100%">
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
                fill="#8884d8"
                stroke="none"
            >
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>

            <svg width={400} height={500}>
              <motion.g
                animate={{ rotate: angle }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                style={{ transformOrigin: `${cx}px ${cy}px` }} // Rotation Center
              >
                <circle cx={cx} cy={cy} r={5} fill="#fff" stroke="none" />
                <path
                  d={`M${cx},${cy - 10} L${cx - 5},${cy + 5} L${cx + 5},${cy + 5} Z`}
                  fill="#fff"
                />
              </motion.g>
            </svg>

            {/* <svg width={400} height={500}>
                <g>
                <circle cx={x0} cy={y0} r={r} fill="#fff" stroke="none" />
                <path d={`M${xba},${yba} L${xbb},${ybb} L${xp},${yp} Z`} fill="#fff" />
                </g>
            </svg> */}
            </PieChart>

         </ResponsiveContainer>
    </div>
  );
};

export default Needle;
