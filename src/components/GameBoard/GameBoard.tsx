// File: src/components/GameBoard/GameBoard.tsx
// Page 5: Main Game Board Component

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

// File: src/components/GameBoard/GameHeader.tsx
// Game Header with Question and Hints

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useGameStore } from '../../store/gameStore';

const GameHeader: React.FC = () => {
  const { dailyPuzzle, hints, gameStatus, useHint } = useGameStore();

  const handleHintPress = () => {
    if (hints > 0 && gameStatus === 'playing') {
      useHint();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LSAT Logic Daily</Text>
      
      {dailyPuzzle && (
        <>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {dailyPuzzle.type.replace('-', ' ').toUpperCase()}
              </Text>
            </View>
            <Text style={styles.difficulty}>
              {dailyPuzzle.difficulty.toUpperCase()}
            </Text>
          </View>
          
          <View style={styles.questionContainer}>
            <Text style={styles.question}>{dailyPuzzle.question}</Text>
          </View>
        </>
      )}
      
      <View style={styles.gameInfo}>
        <TouchableOpacity 
          style={[
            styles.hintButton, 
            { opacity: hints > 0 && gameStatus === 'playing' ? 1 : 0.5 }
          ]}
          onPress={handleHintPress}
          disabled={hints === 0 || gameStatus !== 'playing'}
        >
          <Text style={styles.hintText}>💡 Hints: {hints}</Text>
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </Text>
        </View>
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
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  categoryBadge: {
    backgroundColor: '#6aaa64',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  difficulty: {
    color: '#888',
    fontSize: 12,
    fontWeight: 'bold',
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
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hintButton: {
    backgroundColor: '#3a3a52',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  hintText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressText: {
    color: '#888',
    fontSize: 14,
  },
});

export default GameHeader;