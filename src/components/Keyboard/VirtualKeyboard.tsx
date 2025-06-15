import React from 'react';
import { View, StyleSheet } from 'react-native';
import KeyboardRow from './KeyboardRow';
import { useGameStore } from '../../store/gameStore';

const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

const VirtualKeyboard: React.FC = () => {
  const { 
    guesses, 
    addLetter, 
    deleteLetter, 
    submitGuess,
    canSubmitGuess,
    gameStatus
  } = useGameStore();

  const getLetterStatus = (letter: string) => {
    let status: 'correct' | 'present' | 'absent' | undefined;
    
    for (const guess of guesses) {
      for (const feedback of guess.feedback) {
        if (feedback.letter === letter) {
          if (feedback.status === 'correct') {
            status = 'correct';
            break;
          } else if (feedback.status === 'present' && status !== 'correct') {
            status = 'present';
          } else if (feedback.status === 'absent' && !status) {
            status = 'absent';
          }
        }
      }
    }
    
    return status;
  };

  const handleKeyPress = (key: string) => {
    if (gameStatus !== 'playing') return;
    
    if (key === 'ENTER') {
      if (canSubmitGuess()) {
        submitGuess();
      }
    } else if (key === 'BACKSPACE') {
      deleteLetter();
    } else {
      addLetter(key);
    }
  };

  return (
    <View style={styles.keyboard}>
      {KEYBOARD_LAYOUT.map((row, index) => (
        <KeyboardRow
          key={index}
          keys={row}
          onKeyPress={handleKeyPress}
          getKeyStatus={getLetterStatus}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
});

export default VirtualKeyboard;