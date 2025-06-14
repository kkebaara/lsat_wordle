import { create } from 'zustand';
import { GameState, DailyPuzzle, GuessResult } from '../types/game';
import { LSATGameLogic } from '../utils/gameLogic';

interface GameStore extends GameState {
  makeGuess: (guess: string) => void;
  loadDailyPuzzle: () => void;
  resetGame: () => void;
  dailyPuzzle: DailyPuzzle | null;
}

export const useGameStore = create<GameStore>((set, get) => ({
  currentRow: 0,
  currentCol: 0,
  board: Array(6).fill(null).map(() => Array(5).fill('')),
  guesses: [],
  gameStatus: 'playing',
  solution: '',
  hints: 3,
  timeStarted: new Date(),
  dailyPuzzle: null,

  makeGuess: (guess: string) => {
    const state = get();
    if (state.gameStatus !== 'playing' || guess.length !== 5) return;
    
    const result = LSATGameLogic.validateGuess(guess, state.solution);
    const newGuesses = [...state.guesses, result];
    
    const gameWon = result.isCorrect;
    const gameLost = !gameWon && newGuesses.length >= 6;
    
    set({
      guesses: newGuesses,
      currentRow: state.currentRow + 1,
      gameStatus: gameWon ? 'won' : gameLost ? 'lost' : 'playing'
    });
  },

  loadDailyPuzzle: () => {
    const puzzle = LSATGameLogic.generateDailyPuzzle(new Date());
    set({
      dailyPuzzle: puzzle,
      solution: puzzle.solution
    });
  },

  resetGame: () => {
    set({
      currentRow: 0,
      currentCol: 0,
      board: Array(6).fill(null).map(() => Array(5).fill('')),
      guesses: [],
      gameStatus: 'playing',
      hints: 3,
      timeStarted: new Date()
    });
  }
}));