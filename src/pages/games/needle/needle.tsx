'use client';

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;
const data = [
  { name: 'A', value: 80, color: '#ff0000' },
  { name: 'B', value: 45, color: '#00ff00' },
  { name: 'C', value: 25, color: '#0000ff' },
];

const cx = 150; // Center X
const cy = 200; // Center Y
const iR = 75; // Inner Radius
const oR = 100; // Outer Radius
const value = 50; // Needle Value

const Needle = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures rendering only on the client side
  }, []);

  if (!isClient) return null; // Avoid SSR mismatches

  const total = data.reduce((sum, v) => sum + v.value, 0);
  const angle = 360.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * angle);
  const cos = Math.cos(-RADIAN * angle);
  const r = 5;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return (
    <PieChart width={400} height={500}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill="#8884d8"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>

      {/* Render needle inside <g> to prevent rendering issues */}
      <svg width={400} height={500}>
        <g>
          <circle cx={x0} cy={y0} r={r} fill="#fff" stroke="none" />
          <path d={`M${xba},${yba} L${xbb},${ybb} L${xp},${yp} Z`} fill="#fff" />
        </g>
      </svg>
    </PieChart>
  );
};

export default Needle;
