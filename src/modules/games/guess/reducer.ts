import { shuffle } from './shuffle';

const items = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20
];

type GameStatus = 'playing' | 'won' | 'lost';

interface State {
  allItems: number[];
  opened: number[];
  firstIndex: number | null;
  secondIndex: number | null;
  gridSize: number;
  gameStatus: GameStatus;
}

type Action =
  |{ type: 'RESET_GAME'; payload?: number }
  |{ type: 'OPEN_CARD'; index: number };


export const initialState: State = {
  allItems: [],
  opened: [],
  firstIndex: null,
  secondIndex: null,
  gridSize: 16,
  gameStatus: 'playing',
};


function gameReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESET_GAME': {
      const newGridSize = action.payload ?? state.gridSize;
      return {
        ...state,
        allItems: shuffle([...items, ...items]),
        opened: [],
        firstIndex: null,
        secondIndex: null,
        gameStatus: 'playing',
        gridSize: newGridSize,
      };
    }

    case 'OPEN_CARD': {
      if (state.gameStatus !== 'playing') return state;
      if (state.opened.includes(action.index)) return state;

      // first pick
      if (state.firstIndex === null) {
        return {
          ...state,
          firstIndex: action.index,
          opened: [...state.opened, action.index],
        };
      }
    // second pick
      if (state.secondIndex === null) {
        const firstVal = state.allItems[state.firstIndex];
        const secondVal = state.allItems[action.index];

        return {
          ...state,
          secondIndex: action.index,
          opened: [...state.opened, action.index],
          gameStatus: firstVal === secondVal ? 'won' : 'lost',
        };
      }

      return state;
    }

    default:
      return state;
  }
}


export default gameReducer;
