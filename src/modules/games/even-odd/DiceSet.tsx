'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DiceSetProps {
  dice: [number, number];
  rolling: boolean;
}

const DiceSet: React.FC<DiceSetProps> = ({ dice, rolling }) => {
  return (
    <div className="flex justify-center gap-6 my-4">
      {dice.map((d, i) => (
        <motion.div
          key={i}
          className="w-16 h-16 flex items-center justify-center bg-white rounded-lg shadow-md text-2xl font-bold"
          animate={rolling ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.6 }}
        >
          🎲 {d}
        </motion.div>
      ))}
    </div>
  );
};

export default DiceSet;
