'use client';

import React, { useEffect, useRef, useState } from 'react';
import { shuffle } from './shuffle';


// const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const items = [1, 2, 3, 4, 5, 6]

// const allItems = shuffle([...items, ...items])

const defaultState = { index: -1, value: null }


const Card = () => {

    const [allItems, setAllItems] = useState<number[]>([]);

    const [firstCard, setFirstCard] = useState(defaultState);
    const [secondCard, setSecondCard] = useState(defaultState);
    const [remainingCard, setRemainingCard] = useState(items);


    useEffect(() => {
        setAllItems(shuffle([...items, ...items]))
    }, [])

    const timer = useRef<string | number | undefined | any>('')

    const handleClick = (index: number, value: any) => {
        clearTimeout(timer.current)

        timer.current = setTimeout(() => {
            setFirstCard(defaultState);
            setSecondCard(defaultState);
        }, 3000);


        if(firstCard.index === -1 || (firstCard.index !== -1 && secondCard.index !== -1)){
            setSecondCard(defaultState);
            setFirstCard({index, value})
        } else if(secondCard.index !== -1 && firstCard.index !== -1){
            setSecondCard({index, value});

            if(firstCard.value === value){
                setRemainingCard(remainingCard.filter((card) => card !== value))
            }
        }
    }



  return (
    <div className="guess-card-container">
      {allItems.map((item, index) => {
        const isFlipped =
          firstCard.index === index ||
          secondCard.index === index ||
          !remainingCard.includes(index);

        return (
          <div
            key={index}
            onClick={() => handleClick(index, item)}
            className={`guess-cards ${isFlipped ? 'flipped' : ''}`}
          >
            <div className="backside"></div>
            {item}
          </div>
        );
      })}
    </div>
  )
}

export default Card;
