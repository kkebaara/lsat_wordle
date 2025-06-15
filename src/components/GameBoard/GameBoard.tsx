import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useGameStore } from '../../store/gameStore';
import WordRow from '../WordRow/WordRow';
import VirtualKeyboard from '../Keyboard/VirtualKeyboard';
import GameHeader from './GameHeader';
import ResultsModal from './ResultsModal';

const GameBoard: React.FC = () => {
  const {
    board,
    guesses,
    currentRow,
    gameStatus,
    loadDailyPuzzle,
    showResults
  } = useGameStore();

  useEffect(() => {
    loadDailyPuzzle();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GameHeader />
      
      <View style={styles.boardContainer}>
        {board.map((row, rowIndex) => (
          <WordRow
            key={rowIndex}
            letters={row}
            guess={guesses[rowIndex]}
            isCurrentRow={rowIndex === currentRow && gameStatus === 'playing'}
            rowIndex={rowIndex}
          />
        ))}
      </View>
      
      <VirtualKeyboard />
      
      <ResultsModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default GameBoard;