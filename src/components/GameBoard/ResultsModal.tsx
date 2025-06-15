import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Share,
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
    resetGame 
  } = useGameStore();

  const handleShare = async () => {
    const emoji = guesses.map(guess => 
      guess.feedback.map(f => 
        f.status === 'correct' ? '🟩' : 
        f.status === 'present' ? '🟨' : '⬜'
      ).join('')
    ).join('\n');

    const shareText = `LSAT Logic Daily ${gameStatus === 'won' ? guesses.length : 'X'}/6\n\n${emoji}\n\nPlay at: [Your App URL]`;
    
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
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            {gameStatus === 'won' ? '🎉 Congratulations!' : '😔 Game Over'}
          </Text>
          
          <Text style={styles.subtitle}>
            {gameStatus === 'won' 
              ? `You solved it in ${guesses.length} attempts!`
              : `The answer was: ${solution}`
            }
          </Text>

          {dailyPuzzle && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>Explanation:</Text>
              <Text style={styles.explanation}>{dailyPuzzle.explanation}</Text>
            </View>
          )}

          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Your Attempts:</Text>
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
              <Text style={styles.shareButtonText}>Share Results</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.playAgainButton} onPress={handlePlayAgain}>
              <Text style={styles.playAgainButtonText}>Play Again</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setShowResults(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: '#2a2a40',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
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
  explanationContainer: {
    width: '100%',
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
  statsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  statsTitle: {
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
    backgroundColor: '#6aaa64',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playAgainButton: {
    backgroundColor: '#c9b458',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  playAgainButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 12,
  },
  closeButtonText: {
    color: '#888',
    fontSize: 16,
  },
});

export default ResultsModal;