import React from 'react';
import { StatusBar } from 'expo-status-bar';
import TicTacToe from './components/TicTacToe';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <TicTacToe />
    </>
  );
}