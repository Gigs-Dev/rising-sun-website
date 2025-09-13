'use client';

import React, { useEffect, useState, memo ,useCallback, useRef } from 'react';
import { shuffle } from './shuffle';
import CardSize from './CardSize';
import { motion } from 'framer-motion';

const items = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20
];

const Card: React.FC = memo(() => {
  const [allItems, setAllItems] = useState<number[]>([]);
  const [opened, setOpened] = useState<number[]>([]); 
  const [firstIndex, setFirstIndex] = useState<number | null>(null);
  const [secondIndex, setSecondIndex] = useState<number | null>(null);
  const [gridSize, setGridSize] = useState<number>(16);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const resetGame = (newGridSize = gridSize) => {
    setAllItems(shuffle([...items, ...items])); 
    setOpened([]);
    setFirstIndex(null);
    setSecondIndex(null);
    setGameStatus('playing');
    setGridSize(newGridSize);
  };

  useEffect(() => {
    resetGame(gridSize);
  }, [gridSize, resetGame]);


  const handleClick = useCallback((index: number) => {
    if (gameStatus !== 'playing') return;
    if (opened.includes(index)) return; 
    
    // first pick
    if (firstIndex === null) {
      setFirstIndex(index);
      setOpened(prev => (prev.includes(index) ? prev : [...prev, index]));
      return;
    }

    // second pick
    if (secondIndex === null) {
      setSecondIndex(index);
      setOpened(prev => (prev.includes(index) ? prev : [...prev, index]));

      const firstVal = allItems[firstIndex];
      const secondVal = allItems[index];

      if (firstVal === secondVal) {
        setGameStatus('won');
      } else {
        setGameStatus('lost');
      }
      return;
    }
  },[gameStatus, firstIndex]);

  return (
    <>
      <CardSize onSizeChange={(val) => setGridSize(val * val)} />

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
                className={`guess-cards ${isFlipped ? 'flipped' : ''} `}
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
