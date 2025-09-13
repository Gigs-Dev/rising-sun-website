'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import CardSize from './CardSize';
import { useGameLogic } from './useGameLogic';

const Card: React.FC = memo(() => {
  const { allItems, opened, gridSize, gameStatus, handleClick, resetGame } = useGameLogic();

  return (
    <>
      <CardSize onSizeChange={(val) => resetGame(val * val)} />

      <div
        className="guess-card-container"
        style={{ gridTemplateColumns: `repeat(${Math.sqrt(gridSize)}, 1fr)` }}
      >
        {allItems.slice(0, gridSize).map((item, index) => {
          const isFlipped = opened.includes(index);

          return (
            <motion.div
              key={`${gridSize}-${index}-${item}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.36, delay: index * 0.02 }}
            >
              <div
                onClick={() => handleClick(index)}
                className={`guess-cards ${isFlipped ? 'flipped' : ''}`}
              >
                <div className="frontside">{item}</div>
                <div className="backside" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center text-xl font-bold my-4">
        {gameStatus === 'won' && <span className="text-green-600">🎉 You Won!</span>}
        {gameStatus === 'lost' && <span className="text-red-600">❌ You Lost!</span>}
      </div>

      {gameStatus !== 'playing' && (
        <div className="text-center mb-4">
          <button
            onClick={() => resetGame()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            🔄 Play Again
          </button>
        </div>
      )}
    </>
  );
});

export default Card;
