// File: src/components/Keyboard/VirtualKeyboard.tsx
// Page 3: Working Virtual Keyboard

import React from 'react';
import { View, StyleSheet } from 'react-native';
import KeyboardRow from './KeyboardRow';
import { useGameStore } from '../../store/gameStore';

const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

const VirtualKeyboard: React.FC = () => {
  const { 
    guesses, 
    addLetter, 
    deleteLetter, 
    submitGuess,
    canSubmitGuess,
    gameStatus
  } = useGameStore();

  const getLetterStatus = (letter: string) => {
    let status: 'correct' | 'present' | 'absent' | undefined;
    
    for (const guess of guesses) {
      for (const feedback of guess.feedback) {
        if (feedback.letter === letter) {
          if (feedback.status === 'correct') {
            status = 'correct';
            break;
          } else if (feedback.status === 'present' && status !== 'correct') {
            status = 'present';
          } else if (feedback.status === 'absent' && !status) {
            status = 'absent';
          }
        }
      }
    }
    
    return status;
  };

  const handleKeyPress = (key: string) => {
    if (gameStatus !== 'playing') return;
    
    if (key === 'ENTER') {
      if (canSubmitGuess()) {
        submitGuess();
      }
    } else if (key === 'BACKSPACE') {
      deleteLetter();
    } else {
      addLetter(key);
    }
  };

  return (
    <View style={styles.keyboard}>
      {KEYBOARD_LAYOUT.map((row, index) => (
        <KeyboardRow
          key={index}
          keys={row}
          onKeyPress={handleKeyPress}
          getKeyStatus={getLetterStatus}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
});

export default VirtualKeyboard;

// File: src/components/Keyboard/KeyboardRow.tsx
// Keyboard Row Component

import React from 'react';
import { View, StyleSheet } from 'react-native';
import KeyboardKey from './KeyboardKey';

interface KeyboardRowProps {
  keys: string[];
  onKeyPress: (key: string) => void;
  getKeyStatus: (key: string) => 'correct' | 'present' | 'absent' | undefined;
}

const KeyboardRow: React.FC<KeyboardRowProps> = ({ keys, onKeyPress, getKeyStatus }) => {
  return (
    <View style={styles.row}>
      {keys.map((key) => (
        <KeyboardKey
          key={key}
          keyValue={key}
          onPress={() => onKeyPress(key)}
          status={key.length === 1 ? getKeyStatus(key) : undefined}
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

export default KeyboardRow;

// File: src/components/Keyboard/KeyboardKey.tsx
// Individual Keyboard Key Component

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface KeyboardKeyProps {
  keyValue: string;
  onPress: () => void;
  status?: 'correct' | 'present' | 'absent';
}

const KeyboardKey: React.FC<KeyboardKeyProps> = ({ keyValue, onPress, status }) => {
  const getBackgroundColor = () => {
    switch (status) {
      case 'correct': return '#6aaa64';
      case 'present': return '#c9b458';
      case 'absent': return '#3a3a3c';
      default: return '#818384';
    }
  };

  const getKeyWidth = () => {
    if (keyValue === 'ENTER' || keyValue === 'BACKSPACE') return 65;
    return 35;
  };

  const getKeyText = () => {
    if (keyValue === 'BACKSPACE') return '⌫';
    return keyValue;
  };

  return (
    <TouchableOpacity
      style={[
        styles.key,
        {
          backgroundColor: getBackgroundColor(),
          width: getKeyWidth(),
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.keyText,
        { fontSize: keyValue.length > 1 ? 12 : 16 }
      ]}>
        {getKeyText()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  key: {
    height: 58,
    marginHorizontal: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default KeyboardKey;