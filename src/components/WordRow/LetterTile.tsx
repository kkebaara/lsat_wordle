import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface LetterTileProps {
  letter: string;
  status?: 'correct' | 'present' | 'absent';
  isActive: boolean;
  index: number;
}

const LetterTile: React.FC<LetterTileProps> = ({ letter, status, isActive, index }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (letter && status) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [letter, status]);

  const getBackgroundColor = () => {
    if (!status) return '#2a2a40';
    switch (status) {
      case 'correct':
        return '#6aaa64';
      case 'present':
        return '#c9b458';
      case 'absent':
        return '#3a3a3c';
      default:
        return '#2a2a40';
    }
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.tile,
        {
          backgroundColor: getBackgroundColor(),
          transform: [
            { scale: scaleAnim },
            { rotate: letter && status ? rotate : '0deg' },
          ],
        },
      ]}
    >
      <Text style={[styles.letter, isActive && styles.activeLetter]}>
        {letter.toUpperCase()}
      </Text>
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
  activeLetter: {
    color: '#ffffff',
  },
});

export default LetterTile;
