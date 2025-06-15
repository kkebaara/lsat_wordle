import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import GameBoard from './src/components/GameBoard/GameBoard';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <GameBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
}); 