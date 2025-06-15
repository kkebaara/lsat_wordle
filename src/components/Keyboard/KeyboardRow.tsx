import React from 'react';
import { View, StyleSheet } from 'react-native';
import KeyboardKey from './src/components/Keyboard/KeyboardKey';

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