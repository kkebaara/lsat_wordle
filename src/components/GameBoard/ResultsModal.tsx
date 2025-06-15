// File: src/components/GameBoard/ResultsModal.tsx
// Page 6: Results Modal with Share and Stats

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Share,
  ScrollView,
} from 'react-native';
import { useGameStore } from '../../store/gameStore';

const ResultsModal: React.FC = () => {
  const { 
    showResults, 
    setShowResults, 
    gameStatus, 
    guesses, 
    solution,
    dailyPuzzle,
    resetGame,
    timeStarted,
    timeCompleted
  } = useGameStore();

  const calculateScore = () => {
    if (gameStatus !== 'won') return 0;
    const baseScore = 1000;
    const attemptPenalty = (guesses.length - 1) * 100;
    const timeBonus = timeCompleted && timeStarted 
      ? Math.max(0, 300 - Math.floor((timeCompleted.getTime() - timeStarted.getTime()) / 1000))
      : 0;
    return Math.max(100, baseScore - attemptPenalty + timeBonus);
  };

  const handleShare = async () => {
    const emoji = guesses.map(guess => 
      guess.feedback.map(f => 
        f.status === 'correct' ? '🟩' : 
        f.status === 'present' ? '🟨' : '⬜'
      ).join('')
    ).join('\n');

    const shareText = `LSAT Logic Daily ${gameStatus === 'won' ? guesses.length : 'X'}/6\n\n${emoji}\n\n🧠 Daily logic training for LSAT success!\nPlay at: [Your App URL]`;
    
    try {
      await Share.share({ message: shareText });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handlePlayAgain = () => {
    setShowResults(false);
    resetGame();
  };

  if (!showResults) return null;

  return (
    <Modal
      visible={showResults}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowResults(false)}
    >
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            {gameStatus === 'won' ? '🎉 Excellent!' : '😔 Good Try!'}
          </Text>
          
          <Text style={styles.subtitle}>
            {gameStatus === 'won' 
              ? `Solved in ${guesses.length} attempt${guesses.length === 1 ? '' : 's'}!`
              : `The answer was: ${solution}`
            }
          </Text>

          {gameStatus === 'won' && (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Score: {calculateScore()}</Text>
            </View>
          )}

          {dailyPuzzle && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>💡 Explanation:</Text>
              <Text style={styles.explanation}>{dailyPuzzle.explanation}</Text>
            </View>
          )}

          <View style={styles.attemptsContainer}>
            <Text style={styles.attemptsTitle}>Your Attempts:</Text>
            {guesses.map((guess, index) => (
              <View key={index} style={styles.guessRow}>
                <Text style={styles.guessText}>{guess.word}</Text>
                <View style={styles.guessEmoji}>
                  {guess.feedback.map((f, i) => (
                    <Text key={i} style={styles.emoji}>
                      {f.status === 'correct' ? '🟩' : 
                       f.status === 'present' ? '🟨' : '⬜'}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareButtonText}>📤 Share</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.playAgainButton} onPress={handlePlayAgain}>
              <Text style={styles.playAgainButtonText}>🔄 New Puzzle</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setShowResults(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e0e0',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6aaa64',
    marginBottom: 4,
  },
  explanationContainer: {
    backgroundColor: '#2a2a40',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  explanation: {
    fontSize: 14,
    color: '#d0d0d0',
    lineHeight: 20,
  },
  attemptsContainer: {
    marginBottom: 24,
  },
  attemptsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  guessRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#2a2a40',
    padding: 12,
    borderRadius: 8,
  },
  guessText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  guessEmoji: {
    flexDirection: 'row',
  },
  emoji: {
    fontSize: 16,
    marginLeft: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#6aaa64',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playAgainButton: {
    flex: 1,
    backgroundColor: '#c9b458',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  playAgainButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#888',
    fontSize: 16,
  },
});

export default ResultsModal;