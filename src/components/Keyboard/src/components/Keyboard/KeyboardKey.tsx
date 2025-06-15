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