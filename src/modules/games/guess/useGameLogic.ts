'use client';

import { useCallback, useEffect, useReducer } from "react";
import gameReducer, { initialState } from "./reducer";


export  function useGameLogic() {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const { allItems, opened, gridSize, gameStatus } = state;

    useEffect(() => {
        dispatch({ type: 'RESET_GAME', payload: gridSize });
    }, [gridSize]);

    const handleClick = useCallback(
        (index: number) => {
        dispatch({ type: 'OPEN_CARD', index });
        },
        []
    );

    const resetGame = useCallback(
    (newSize?: number) => {
      dispatch({ type: 'RESET_GAME', payload: newSize });
    },
    []
  );

  return {
    allItems,
    opened,
    gridSize,
    gameStatus,
    handleClick,
    resetGame,
  };
}

