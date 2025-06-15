import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, DailyPuzzle, GuessResult } from '../types/game';
import { LSATGameLogic } from '../utils/gameLogic';

interface GameStore extends GameState {
  // Game actions
  makeGuess: (guess: string) => void;
  addLetter: (letter: string) => void;
  deleteLetter: () => void;
  submitGuess: () => void;
  loadDailyPuzzle: () => void;
  resetGame: () => void;
  
  // UI state
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  
  // Puzzle data
  dailyPuzzle: DailyPuzzle | null;
  
  // Helper functions
  getCurrentWord: () => string;
  canSubmitGuess: () => boolean;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial game state
      currentRow: 0,
      currentCol: 0,
      board: Array(6).fill(null).map(() => Array(5).fill('')),
      guesses: [],
      gameStatus: 'playing',
      solution: '',
      hints: 3,
      timeStarted: new Date(),
      dailyPuzzle: null,
      showResults: false,

      // Add letter to current position
      addLetter: (letter: string) => {
        const state = get();
        if (state.gameStatus !== 'playing' || state.currentCol >= 5) return;
        
        const newBoard = [...state.board];
        newBoard[state.currentRow][state.currentCol] = letter.toUpperCase();
        
        set({
          board: newBoard,
          currentCol: state.currentCol + 1
        });
      },

      // Delete last letter
      deleteLetter: () => {
        const state = get();
        if (state.gameStatus !== 'playing' || state.currentCol <= 0) return;
        
        const newBoard = [...state.board];
        newBoard[state.currentRow][state.currentCol - 1] = '';
        
        set({
          board: newBoard,
          currentCol: state.currentCol - 1
        });
      },

      // Submit current row as guess
      submitGuess: () => {
        const state = get();
        const currentWord = state.getCurrentWord();
        
        if (!state.canSubmitGuess()) return;
        
        const result = LSATGameLogic.validateGuess(currentWord, state.solution);
        const newGuesses = [...state.guesses, result];
        
        const gameWon = result.isCorrect;
        const gameLost = !gameWon && newGuesses.length >= 6;
        
        set({
          guesses: newGuesses,
          currentRow: gameWon || gameLost ? state.currentRow : state.currentRow + 1,
          currentCol: 0,
          gameStatus: gameWon ? 'won' : gameLost ? 'lost' : 'playing',
          timeCompleted: (gameWon || gameLost) ? new Date() : undefined,
          showResults: gameWon || gameLost
        });
      },

      // Legacy function for compatibility
      makeGuess: (guess: string) => {
        // This function is kept for backward compatibility
        // The new approach uses addLetter + submitGuess
        console.warn('makeGuess is deprecated, use addLetter and submitGuess instead');
      },

      loadDailyPuzzle: () => {
        const puzzle = LSATGameLogic.generateDailyPuzzle(new Date());
        set({
          dailyPuzzle: puzzle,
          solution: puzzle.solution,
          timeStarted: new Date()
        });
      },

      resetGame: () => {
        get().loadDailyPuzzle(); // Load new puzzle
        set({
          currentRow: 0,
          currentCol: 0,
          board: Array(6).fill(null).map(() => Array(5).fill('')),
          guesses: [],
          gameStatus: 'playing',
          hints: 3,
          timeStarted: new Date(),
          timeCompleted: undefined,
          showResults: false
        });
      },

      setShowResults: (show: boolean) => set({ showResults: show }),

      // Helper functions
      getCurrentWord: () => {
        const state = get();
        return state.board[state.currentRow].join('');
      },

      canSubmitGuess: () => {
        const state = get();
        return state.currentCol === 5 && state.gameStatus === 'playing';
      }
    }),
    {
      name: 'lsat-game-storage',
      partialize: (state) => ({
        // Only persist certain parts of the state
        guesses: state.guesses,
        gameStatus: state.gameStatus,
        currentRow: state.currentRow,
        board: state.board,
        dailyPuzzle: state.dailyPuzzle,
        timeStarted: state.timeStarted,
        timeCompleted: state.timeCompleted
      })
    }
  )
);