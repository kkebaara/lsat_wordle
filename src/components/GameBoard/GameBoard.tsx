import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useGameStore } from '../../store/gameStore';

const GameBoard: React.FC = () => {
  const { board, guesses, loadDailyPuzzle, dailyPuzzle } = useGameStore();

  useEffect(() => {
    loadDailyPuzzle();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LSAT Logic Daily</Text>
      
      {dailyPuzzle && (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{dailyPuzzle.question}</Text>
        </View>
      )}
      
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((letter, colIndex) => (
              <View key={colIndex} style={styles.tile}>
                <Text style={styles.letter}>{letter}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      
      <Text style={styles.instructions}>
        Tap here to add keyboard in next step
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
  },
  questionContainer: {
    backgroundColor: '#2a2a40',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  board: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  tile: {
    width: 56,
    height: 56,
    marginHorizontal: 2,
    borderWidth: 2,
    borderColor: '#565758',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16213e',
  },
  letter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  instructions: {
    color: '#888',
    textAlign: 'center',
    padding: 20,
  },
});

export default GameBoard;