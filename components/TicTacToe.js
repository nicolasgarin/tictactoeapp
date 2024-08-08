import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Svg, Circle, Line } from 'react-native-svg';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handlePress = (i) => {
    if (winner || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  const aiMove = () => {
    const emptySquares = board.reduce((acc, val, idx) => 
      val === null ? [...acc, idx] : acc, []);
    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const newBoard = [...board];
      newBoard[emptySquares[randomIndex]] = 'O';
      setBoard(newBoard);
      setIsXNext(true);
    }
  };

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      setWinner(winner);
      Alert.alert('Fin del juego', winner === 'X' ? '¡Has ganado!' : '¡La IA ha ganado!');
    } else if (!isXNext) {
      const timer = setTimeout(() => {
        aiMove();
      }, 500);
      return () => clearTimeout(timer);
    } else if (board.every(square => square !== null)) {
      Alert.alert('Empate', 'No hay más movimientos posibles.');
    }
  }, [board, isXNext]);

  const renderSquare = (i) => (
    <TouchableOpacity style={styles.square} onPress={() => handlePress(i)}>
      {board[i] === 'X' && (
        <Svg height="60" width="60">
          <Line x1="10" y1="10" x2="50" y2="50" stroke="blue" strokeWidth="3" />
          <Line x1="50" y1="10" x2="10" y2="50" stroke="blue" strokeWidth="3" />
        </Svg>
      )}
      {board[i] === 'O' && (
        <Svg height="60" width="60">
          <Circle cx="30" cy="30" r="25" stroke="red" strokeWidth="3" fill="none" />
        </Svg>
      )}
    </TouchableOpacity>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.board}>
        {Array(9).fill(null).map((_, i) => (
          <View key={i}>{renderSquare(i)}</View>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Reiniciar juego</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 240,
    height: 240,
    marginBottom: 20,
  },
  square: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TicTacToe;