import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface LetterTileProps {
  letter: string;
  status?: 'correct' | 'present' | 'absent';
  isCurrentRow: boolean;
  delay: number;
}

const LetterTile: React.FC<LetterTileProps> = ({ letter, status, isCurrentRow, delay }) => {
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    if (letter && isCurrentRow) {
      Animated.sequence([
        Animated.delay(delay),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
      ]).start();
    }
  }, [letter, isCurrentRow]);

  const getBackgroundColor = () => {
    if (!status) return '#2d2d3a';
    switch (status) {
      case 'correct':
        return '#538d4e';
      case 'present':
        return '#b59f3b';
      case 'absent':
        return '#3a3a3c';
      default:
        return '#2d2d3a';
    }
  };

  return (
    <Animated.View
      style={[
        styles.tile,
        {
          backgroundColor: getBackgroundColor(),
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={styles.letter}>{letter.toUpperCase()}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 50,
    height: 50,
    margin: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3a3a3c',
  },
  letter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default LetterTile;
