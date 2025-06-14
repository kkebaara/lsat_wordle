import { DailyPuzzle, GuessResult, LetterFeedback } from '../types/game';

export class LSATGameLogic {
  static validateGuess(guess: string, solution: string): GuessResult {
    const feedback: LetterFeedback[] = [];
    const solutionArray = solution.toUpperCase().split('');
    const guessArray = guess.toUpperCase().split('');
    
    // First pass: exact matches
    for (let i = 0; i < guessArray.length; i++) {
      if (guessArray[i] === solutionArray[i]) {
        feedback[i] = { letter: guessArray[i], status: 'correct' };
      }
    }
    
    // Second pass: present but wrong position
    for (let i = 0; i < guessArray.length; i++) {
      if (!feedback[i]) {
        const letter = guessArray[i];
        if (solutionArray.includes(letter)) {
          feedback[i] = { letter, status: 'present' };
        } else {
          feedback[i] = { letter, status: 'absent' };
        }
      }
    }
    
    return {
      word: guess.toUpperCase(),
      feedback,
      isCorrect: guess.toUpperCase() === solution.toUpperCase()
    };
  }

  static generateDailyPuzzle(date: Date): DailyPuzzle {
    const puzzles = [
      {
        type: 'logical-reasoning' as const,
        question: 'A word that describes flawed reasoning',
        solution: 'LOGIC',
        hint: 'What LSAT tests',
        difficulty: 'medium' as const,
        explanation: 'Logic is fundamental to LSAT success.'
      }
    ];
    
    return {
      id: `puzzle-${date.toISOString().split('T')[0]}`,
      date: date.toISOString().split('T')[0],
      ...puzzles[0]
    };
  }
}