import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGameStore } from '../../store/gameStore';

const GameHeader: React.FC = () => {
  const { dailyPuzzle, hints } = useGameStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LSAT Logic Daily</Text>
      
      {dailyPuzzle && (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{dailyPuzzle.question}</Text>
        </View>
      )}
      
      <View style={styles.hintsContainer}>
        <Text style={styles.hintsText}>Hints remaining: {hints}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  questionContainer: {
    backgroundColor: '#2a2a40',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  question: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    lineHeight: 22,
  },
  hintsContainer: {
    alignItems: 'center',
  },
  hintsText: {
    fontSize: 14,
    color: '#888',
  },
});

export default GameHeader;