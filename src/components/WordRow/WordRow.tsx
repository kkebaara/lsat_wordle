// File: src/components/WordRow/WordRow.tsx
// Page 4: Word Row with Visual Feedback

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
          key={`${rowIndex}-${index}`}
          letter={letter}
          status={guess?.feedback[index]?.status}
          isCurrentRow={isCurrentRow}
          delay={index * 100} // Stagger animation
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

// File: src/components/WordRow/LetterTile.tsx
// Animated Letter Tile Component

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface LetterTileProps {
  letter: string;
  status?: 'correct' | 'present' | 'absent';
  isCurrentRow: boolean;
  delay?: number;
}

const LetterTile: React.FC<LetterTileProps> = ({ 
  letter, 
  status, 
  isCurrentRow, 
  delay = 0 
}) => {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (status) {
      // Flip animation when guess is submitted
      setTimeout(() => {
        Animated.sequence([
          Animated.timing(flipAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }, delay);
    }
  }, [status, delay]);

  useEffect(() => {
    if (letter && isCurrentRow) {
      // Pop animation when letter is typed
      Animated.sequence([
        Animated.timing(scaleAnimation, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [letter, isCurrentRow]);

  const getBackgroundColor = () => {
    if (!status) {
      return isCurrentRow && letter ? '#3a3a52' : '#16213e';
    }
    switch (status) {
      case 'correct': return '#6aaa64'; // Green
      case 'present': return '#c9b458'; // Yellow
      case 'absent': return '#787c7e';  // Gray
      default: return '#16213e';
    }
  };

  const getBorderColor = () => {
    if (letter && !status) return '#565758';
    return 'transparent';
  };

  return (
    <Animated.View
      style={[
        styles.tile,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          transform: [
            { scale: scaleAnimation },
            {
              rotateY: flipAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.letter}>{letter}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 56,
    height: 56,
    marginHorizontal: 2,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default LetterTile;