// File: src/utils/gameLogic.ts
// Page 2: Enhanced Game Logic with More Puzzles

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
      // Logical Reasoning puzzles
      {
        type: 'logical-reasoning',
        question: 'A word that describes flawed reasoning where the conclusion doesn\'t follow',
        solution: 'LOGIC',
        hint: 'What LSAT tests fundamentally',
        difficulty: 'medium',
        explanation: 'Logic is the foundation of LSAT success. Understanding logical fallacies is crucial for the logical reasoning section.'
      },
      {
        type: 'logical-reasoning',
        question: 'A statement that must be true if the premises are true',
        solution: 'VALID',
        hint: 'Opposite of invalid',
        difficulty: 'hard',
        explanation: 'In logic, a valid argument is one where the conclusion necessarily follows from the premises.'
      },
      {
        type: 'logical-reasoning',
        question: 'To draw a conclusion from evidence and reasoning',
        solution: 'INFER',
        hint: 'Reading between the lines',
        difficulty: 'medium',
        explanation: 'Inference is drawing logical conclusions from given information - essential for LSAT success.'
      },
      {
        type: 'logical-reasoning',
        question: 'An assertion or proposition to be proven',
        solution: 'CLAIM',
        hint: 'What you\'re trying to prove',
        difficulty: 'easy',
        explanation: 'A claim is a statement that an argument attempts to establish as true.'
      },
      {
        type: 'logical-reasoning',
        question: 'Something that brings about an effect',
        solution: 'CAUSE',
        hint: 'What makes something happen',
        difficulty: 'medium',
        explanation: 'Understanding causation is crucial for analyzing arguments in LSAT logical reasoning.'
      },

      // LSAT Vocabulary puzzles
      {
        type: 'vocabulary',
        question: 'To make a forceful or emotional appeal',
        solution: 'PLEAD',
        hint: 'What lawyers do in court',
        difficulty: 'easy',
        explanation: 'Pleading is making an earnest request or appeal, common in legal contexts.'
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
        type: 'vocabulary',
        question: 'To suggest without explicitly stating',
        solution: 'IMPLY',
        hint: 'Indirect suggestion',
        difficulty: 'medium',
        explanation: 'Implication is crucial in LSAT - understanding what\'s suggested but not stated.'
      },
      {
        type: 'vocabulary',
        question: 'To contradict or oppose with evidence',
        solution: 'REBUT',
        hint: 'Counter an argument',
        difficulty: 'hard',
        explanation: 'Rebuttal involves providing counter-evidence to challenge an argument.'
      },
      {
        type: 'vocabulary',
        question: 'To state or declare positively',
        solution: 'ASSERT',
        hint: 'Confident declaration',
        difficulty: 'medium',
        explanation: 'Assertion is a confident and forceful statement of fact or belief.'
      },

      // Conditional Logic puzzles
      {
        type: 'conditional-logic',
        question: 'A rule or principle that must be followed',
        solution: 'RULES',
        hint: 'Guidelines to follow',
        difficulty: 'easy',
        explanation: 'Rules in logic games establish constraints that must be satisfied.'
      },
      {
        type: 'conditional-logic',
        question: 'A necessary condition that must be met',
        solution: 'MUST',
        hint: 'Required condition',
        difficulty: 'easy',
        explanation: 'Must indicates a necessary condition that cannot be violated.'
      },
      {
        type: 'conditional-logic',
        question: 'Not allowed or possible',
        solution: 'NEVER',
        hint: 'Absolute prohibition',
        difficulty: 'easy',
        explanation: 'Never indicates an absolute constraint that cannot occur.'
      },
      {
        type: 'conditional-logic',
        question: 'Multiple possibilities or options',
        solution: 'COULD',
        hint: 'Possible but not required',
        difficulty: 'medium',
        explanation: 'Could indicates possibility - something that may happen but isn\'t required.'
      },
      {
        type: 'conditional-logic',
        question: 'Arranged in a specific sequence',
        solution: 'ORDER',
        hint: 'Sequential arrangement',
        difficulty: 'medium',
        explanation: 'Order determines the sequence or arrangement of elements.'
      }
    ];
    
    // Use date to select puzzle (ensures daily rotation)
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    const selectedPuzzle = puzzles[dayOfYear % puzzles.length];
    
    return {
      id: `puzzle-${date.toISOString().split('T')[0]}`,
      date: date.toISOString().split('T')[0],
      ...selectedPuzzle
    };
  }

  static calculateScore(guesses: number, timeElapsed: number, hintsUsed: number): number {
    const baseScore = 1000;
    const guessPenalty = (guesses - 1) * 100;
    const timePenalty = Math.floor(timeElapsed / 1000) * 2;
    const hintPenalty = hintsUsed * 150;
    
    return Math.max(0, baseScore - guessPenalty - timePenalty - hintPenalty);
  }
}