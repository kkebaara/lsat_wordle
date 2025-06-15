import React from 'react';
import { View, StyleSheet } from 'react-native';
import LetterTile from './LetterTile';
import { GuessResult } from '../../types/game';

interface WordRowProps {
  letters: string[];
  guess?: GuessResult;
  isCurrentRow: boolean;
  rowIndex: number;
}

const WordRow: React.FC<WordRowProps> = ({ letters, guess, isCurrentRow, rowIndex }) => {
  return (
    <View style={styles.row}>
      {letters.map((letter, index) => (
        <LetterTile
          key={index}
          letter={letter}
          status={guess?.feedback[index]?.status}
          isActive={isCurrentRow}
          index={index}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
});

export default WordRow; 