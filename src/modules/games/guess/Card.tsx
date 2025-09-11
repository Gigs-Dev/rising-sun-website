'use client';

import React, { useEffect, useRef, useState } from 'react';
import { shuffle } from './shuffle';
import CardSize from './CardSize';
import { motion } from 'framer-motion';

interface CardState {
  index: number;
  value: number | null;
}

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const defaultState: CardState = { index: -1, value: null };

const Card = () => {
  const [allItems, setAllItems] = useState<number[]>([]);
  const [firstCard, setFirstCard] = useState(defaultState);
  const [secondCard, setSecondCard] = useState(defaultState);
  const [remainingCard, setRemainingCard] = useState(items);

  const [gridSize, setGridSize] = useState<number>(16);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const timer = useRef<NodeJS.Timeout | null>(null);

  // 🔹 Function to reset the game
  const resetGame = (newGridSize = gridSize) => {
    setAllItems(shuffle([...items, ...items]));
    setFirstCard(defaultState);
    setSecondCard(defaultState);
    setRemainingCard(items);
    setGameStatus('playing');
    setGridSize(newGridSize);
  };



  // Reset when gridSize changes from dropdown
  useEffect(() => {
    resetGame(gridSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize]);

  const handleClick = (index: number, value: number) => {
    if (gameStatus !== 'playing') return;
    if (firstCard.index === index || secondCard.index === index) return;

    if (firstCard.index === -1) {
      setFirstCard({ index, value });
      return;
    }

    if (secondCard.index === -1) {
      setSecondCard({ index, value });

      if (firstCard.value === value) {
        // ✅ Match
        setRemainingCard((prev) => {
          const updated = prev.filter((card) => card !== value);
          if (updated.length === 0) {
            setGameStatus('won');
          }
          return updated;
        });

        timer.current = setTimeout(() => {
          setFirstCard(defaultState);
          setSecondCard(defaultState);
        }, 1000);
      } else {
        // ❌ Mismatch → lose immediately
        setGameStatus('lost');

        timer.current = setTimeout(() => {
          setFirstCard(defaultState);
          setSecondCard(defaultState);
        }, 1000);
      }
    }
  };

  return (
    <>
      <CardSize onSizeChange={(val) => setGridSize(val * val)} />

      <div
        className="guess-card-container"
        style={{
          gridTemplateColumns: `repeat(${Math.sqrt(gridSize)}, 1fr)`,
        }}
      >
        {allItems.slice(0, gridSize).map((item, index) => {
          const isFlipped =
            firstCard.index === index ||
            secondCard.index === index ||
            !remainingCard.includes(item);

          return (
            <motion.div
              key={`${gridSize}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div
                // ✅ Disable clicks when not playing
                onClick={() => gameStatus === 'playing' && handleClick(index, item)}
                className={`guess-cards ${isFlipped ? 'flipped' : ''} ${
                  gameStatus !== 'playing' ? 'pointer-events-none opacity-70' : ''
                }`}
              >
                <div className="frontside">{item}</div>
                <div className="backside"></div>
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
};

export default Card;
