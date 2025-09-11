'use client';

import { useState, useEffect } from 'react';
import { shuffle } from './shuffle';

const useGameLogic = (gridSize: number) => {
  const [allItems, setAllItems] = useState<number[]>([]);
  const [opened, setOpened] = useState<number[]>([]);
  const [firstIndex, setFirstIndex] = useState<number | null>(null);
  const [secondIndex, setSecondIndex] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  useEffect(() => {
    resetGame(gridSize);
  }, [gridSize]);

  const resetGame = (newGridSize = gridSize) => {
    setAllItems(shuffle([...Array(newGridSize / 2).keys(), ...Array(newGridSize / 2).keys()]));
    setOpened([]);
    setFirstIndex(null);
    setSecondIndex(null);
    setGameStatus('playing');
  };

  const handleCardClick = (index: number) => {
    if (gameStatus !== 'playing') return;
    if (opened.includes(index)) return;

    if (firstIndex === null) {
      setFirstIndex(index);
      setOpened((prev) => [...prev, index]);
      return;
        }
    if (secondIndex === null) {
        setSecondIndex(index);
        setOpened((prev) => [...prev, index]);
        const firstVal = allItems[firstIndex];
        const secondVal = allItems[index];
        if (firstVal === secondVal) {
            // Update game status if all pairs are found
            const allPairsFound = allItems.every((item, idx) => opened.includes(idx) || idx === index || idx === firstIndex);
            if (allPairsFound) {
            setGameStatus('won');
            }
        } else {
            setTimeout(() => {
            setOpened((prev) => prev.filter((i) => i !== index && i !== firstIndex));
            setFirstIndex(null);
            setSecondIndex(null);
            }, 1000);
        }
        }
    };

     return {
        allItems,
        opened,
        gameStatus,
        handleCardClick,
        resetGame,
    };
};

export default useGameLogic;
