'use client';

import React, { useEffect, useRef, useState } from 'react';
import { shuffle } from './shuffle';


interface CardState {
  index: number;
  value: number | null;
}




const items = [1, 2, 3, 4, 5, 6];
const defaultState:CardState = { index: -1, value: null };

const Card = () => {
  const [allItems, setAllItems] = useState<number[]>([]);
  const [firstCard, setFirstCard] = useState(defaultState);
  const [secondCard, setSecondCard] = useState(defaultState);
  const [remainingCard, setRemainingCard] = useState(items);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setAllItems(shuffle([...items, ...items]));
  }, []);

  const handleClick = (index: number, value: number) => {

    if (firstCard.index === index || secondCard.index === index) return;

    // First card selection
    if (firstCard.index === -1) {
      setFirstCard({ index, value });
      return;
    }

    // Second card selection
    if (secondCard.index === -1) {
      setSecondCard({ index, value });

      // Check if it's a match
      if (firstCard.value === value) {
        setRemainingCard((prev) => prev.filter((card) => card !== value));

        // Reset cards after a short delay so user sees the match
        timer.current = setTimeout(() => {
          setFirstCard(defaultState);
          setSecondCard(defaultState);
        }, 1000);
      } else {
        // If mismatch → flip back after 1s
        timer.current = setTimeout(() => {
          setFirstCard(defaultState);
          setSecondCard(defaultState);
        }, 1000);
      }
    }
  };

  return (
    <div className="guess-card-container">
      {allItems.map((item, index) => {
        const isFlipped =
          firstCard.index === index ||
          secondCard.index === index ||
          !remainingCard.includes(item);

        return (
          <div
            key={index}
            onClick={() => handleClick(index, item)}
            className={`guess-cards ${isFlipped ? 'flipped' : ''}`}
          >
            <div className="frontside">{item}</div>
            <div className="backside"></div>
           
          </div>
        );
      })}
    </div>
  );
};

export default Card;
