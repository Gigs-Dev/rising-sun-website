'use client';

import { useState, useCallback } from 'react';

export type GameStatus = 'idle' | 'won' | 'lost';

export function useDiceGame(startingBalance = 1000) {
  const [balance, setBalance] = useState(startingBalance);
  const [bet, setBet] = useState(50);
  const [dice, setDice] = useState<[number, number]>([1, 1]);
  const [status, setStatus] = useState<GameStatus>('idle');
  const [rolling, setRolling] = useState(false);

  const rollDice = useCallback(() => {
    return [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)] as [number, number];
  }, []);

  const playRound = useCallback((choice: 'even' | 'odd') => {
    if (rolling || bet > balance) return;

    setRolling(true);
    setStatus('idle');

    setTimeout(() => {
      const newDice = rollDice();
      const total = newDice[0] + newDice[1];
      const outcome = total % 2 === 0 ? 'even' : 'odd';

      if (outcome === choice) {
        setBalance(b => b + bet);
        setStatus('won');
      } else {
        setBalance(b => b - bet);
        setStatus('lost');
      }

      setDice(newDice);
      setRolling(false);
    }, 600);
  }, [bet, balance, rollDice, rolling]);

  return {
    balance,
    bet,
    setBet,
    dice,
    status,
    rolling,
    playRound,
  };
}
