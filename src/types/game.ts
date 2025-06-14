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