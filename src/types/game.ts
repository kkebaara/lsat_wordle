export interface GameState {
    currentRow: number;
    currentCol: number;
    board: string[][];
    guesses: GuessResult[];
    gameStatus: 'playing' | 'won' | 'lost';
    solution: string;
    hints: number;
    timeStarted: Date;
    timeCompleted?: Date;
  }
  
  export interface GuessResult {
    word: string;
    feedback: LetterFeedback[];
    isCorrect: boolean;
  }
  
  export interface LetterFeedback {
    letter: string;
    status: 'correct' | 'present' | 'absent';
  }
  
  export interface DailyPuzzle {
    id: string;
    date: string;
    type: 'logical-reasoning' | 'vocabulary' | 'conditional-logic';
    question: string;
    solution: string;
    hint?: string;
    difficulty: 'easy' | 'medium' | 'hard';
    explanation: string;
  }

  export interface UserStats {
    gamesPlayed: number;
    gamesWon: number;
    currentStreak: number;
    maxStreak: number;
    averageGuesses: number;
    distribution: number[]; // [1, 2, 3, 4, 5, 6] attempts
    lastPlayedDate: string;
    totalScore: number;
  }