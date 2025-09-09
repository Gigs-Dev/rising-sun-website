import React from 'react';
import { shuffle } from './shuffle';


// const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const items = [1, 2, 3, 4, 5, 6]

const allItems = shuffle([...items, ...items])

console.log(allItems);


const Card = () => {
  return (
    <>
        <div className='guess-card-container'>
        {allItems.map((item, index) => {
            return (
                <div className="guess-cards" key={index}>
                    <div className="backside"></div>

                    <div className="">{item}</div>
                </div>
            )
        })}
        </div>
    </>
  )
}

export default Card;
