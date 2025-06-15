import { DailyPuzzle, GuessResult, LetterFeedback } from '../types/game';

export class LSATGameLogic {
  static validateGuess(guess: string, solution: string): GuessResult {
    const feedback: LetterFeedback[] = [];
    const solutionArray = solution.toUpperCase().split('');
    const guessArray = guess.toUpperCase().split('');
    const usedIndices = new Set<number>();
    
    // First pass: exact matches
    for (let i = 0; i < guessArray.length; i++) {
      if (guessArray[i] === solutionArray[i]) {
        feedback[i] = { letter: guessArray[i], status: 'correct' };
        usedIndices.add(i);
      }
    }
    
    // Second pass: present but wrong position
    for (let i = 0; i < guessArray.length; i++) {
      if (!feedback[i]) {
        const letter = guessArray[i];
        const foundIndex = solutionArray.findIndex((l, idx) => 
          l === letter && !usedIndices.has(idx)
        );
        
        if (foundIndex !== -1) {
          feedback[i] = { letter, status: 'present' };
          usedIndices.add(foundIndex);
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
    const puzzles: Omit<DailyPuzzle, 'id' | 'date'>[] = [
      {
        type: 'logical-reasoning',
        question: 'A word that describes flawed reasoning where the conclusion doesn\'t follow from the premises',
        solution: 'LOGIC',
        hint: 'Think about what LSAT tests',
        difficulty: 'medium',
        explanation: 'Logic is fundamental to LSAT success. Understanding logical fallacies is crucial for the logical reasoning section.'
      },
      {
        type: 'vocabulary',
        question: 'To make a forceful or emotional appeal, especially to a higher authority',
        solution: 'PLEAD',
        hint: 'What lawyers do in court',
        difficulty: 'easy',
        explanation: 'Pleading is a common legal term meaning to make an earnest request or appeal.'
      },
      {
        type: 'conditional-logic',
        question: 'A statement that must be true if the premises are true',
        solution: 'VALID',
        hint: 'Opposite of invalid',
        difficulty: 'hard',
        explanation: 'In logic, a valid argument is one where the conclusion necessarily follows from the premises.'
      },
      {
        type: 'vocabulary',
        question: 'To examine or investigate thoroughly',
        solution: 'PROBE',
        hint: 'What detectives do',
        difficulty: 'medium',
        explanation: 'To probe means to investigate deeply, a key skill in analyzing LSAT passages.'
      },
      {
        type: 'logical-reasoning',
        question: 'A conclusion drawn from evidence and reasoning',
        solution: 'INFER',
        hint: 'Reading between the lines',
        difficulty: 'medium',
        explanation: 'Inference is drawing logical conclusions from given information - essential for LSAT success.'
      }
    ];
    
    // Use date to select puzzle (simple rotation)
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    const selectedPuzzle = puzzles[dayOfYear % puzzles.length];
    
    return {
      id: `puzzle-${date.toISOString().split('T')[0]}`,
      date: date.toISOString().split('T')[0],
      ...selectedPuzzle
    };
  }
}