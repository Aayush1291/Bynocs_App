import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import Sloan_Letter_C from '../assets/Sloan_Letter_C.svg';
import Sloan_Letter_D from '../assets/Sloan_Letter_D.svg';
import Sloan_Letter_H from '../assets/Sloan_Letter_H.svg';
import Sloan_Letter_K from '../assets/Sloan_Letter_K.svg';
import Sloan_Letter_N from '../assets/Sloan_Letter_N.svg';
import Sloan_Letter_O from '../assets/Sloan_Letter_O.svg';
import Sloan_Letter_R from '../assets/Sloan_Letter_R.svg';
import Sloan_Letter_S from '../assets/Sloan_Letter_S.svg';
import Sloan_Letter_V from '../assets/Sloan_Letter_V.svg';
import Sloan_Letter_Z from '../assets/Sloan_Letter_Z.svg';

const alphabet = [
  Sloan_Letter_C,
  Sloan_Letter_D,
  Sloan_Letter_H,
  Sloan_Letter_K,
  Sloan_Letter_N,
  Sloan_Letter_O,
  Sloan_Letter_R,
  Sloan_Letter_S,
  Sloan_Letter_V,
  Sloan_Letter_Z
];

const optionSize = 40;

const sizes = [40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 4, 2];

const Activity1 = ({navigation}) => {
  const [currentLetter, setCurrentLetter] = useState(0);
  const [options, setOptions] = useState([]);
  const [currentSize, setCurrentSize] = useState(sizes[0]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const[round2,setRound2]=useState(false)
  const [showExitModal, setShowExitModal] = useState(false); // State variable to control modal visibility

  const timerRef = useRef(null);
  useEffect(() => {
    setCurrentLetter(0);
    generateOptions();
    startTimer();

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);
  const startTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleGameOver();
    }, 15000);
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  const handleExit = () => {
    setShowExitModal(false);
    navigation.navigate('Home'); // Navigate back to the home page
  };

  const resetGame = () => {
    setCurrentLetter(0);
    setOptions([]);
    setCurrentSize(sizes[0]);
    setScore(0);
    setGameOver(false);
    startTimer();
    generateOptions();
    setRound2(!round2?true:false);
  };

  const generateOptions = () => {
    const correctOptionIndex = Math.floor(Math.random() * alphabet.length);
    const randomOptions = [];

    while (randomOptions.length < 3) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      if (!randomOptions.includes(randomIndex) && randomIndex !== correctOptionIndex) {
        randomOptions.push(randomIndex);
      }
    }

    randomOptions.push(correctOptionIndex);
    randomOptions.sort(() => Math.random() - 0.5);

    setOptions(randomOptions);
    setCurrentLetter(correctOptionIndex);
  };

  const handleOptionPress = (optionIndex) => {
    clearTimeout(timerRef.current); // Clear the current timer

    if (optionIndex === currentLetter) {
      const sizeIndex = sizes.indexOf(currentSize);
      const nextSizeIndex = (sizeIndex + 3) % sizes.length;
      const nextSize = sizes[nextSizeIndex];
      setCurrentLetter((prevLetter) => (prevLetter + 3) % alphabet.length);
      setCurrentSize(nextSize);
      setScore((prevScore) => prevScore + 10); // Increase score by 10
    } else {
      if(score>0)
      {
      const sizeIndex = sizes.indexOf(currentSize);
      const nextSizeIndex = (sizeIndex - 2 + sizes.length) % sizes.length;
      const nextSize = sizes[nextSizeIndex];
      setCurrentLetter((prevLetter) => (prevLetter - 2 + alphabet.length) % alphabet.length);
      setCurrentSize(nextSize);
    }
  }

    generateOptions();
    startTimer();
  };

  const CurrentLetterComponent = alphabet[currentLetter];

  if (gameOver) {
    return (
      <View style={styles.container}>
<Text style={styles.gameOverText}>
  {round2 ? "Round 2 Over" : "Round 1 Over"}
</Text>

        <Text>Last Correctly Answered Size: {currentSize}</Text>
        <Text>Score: {score}</Text>
        <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
          <Text style={styles.restartButtonText}>  {round2 ? "Restart game" : "Round2"}
</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CurrentLetterComponent width={currentSize} height={currentSize} style={{opacity:round2 ? 0.5:null}} />

      <Text style={styles.scoreText}>Score: {score}</Text>

      <View style={styles.optionsContainer}>
        {options.map((optionIndex) => {
          const OptionComponent = alphabet[optionIndex];
          return (
            <TouchableOpacity
              key={optionIndex}
              style={styles.optionButton}
              onPress={() => handleOptionPress(optionIndex)}
            >
              <OptionComponent width={optionSize} height={optionSize} />
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        onPress={() => setShowExitModal(true)}
        style={styles.exitButton}>
        <Text style={styles.exitButtonText}>Exit</Text>
      </TouchableOpacity>

      <Modal visible={showExitModal} animationType="slide" transparent={true}>
        <View style={styles.modalExitContainer}>
          <View style={styles.modalExitContent}>
          <Text style={styles.modalText}>Well Done!</Text>
            <Text style={[styles.modalText, {marginBottom: responsiveHeight(2)}]}>
              Score: {score}
            </Text>
            <TouchableOpacity onPress={handleExit} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exitButton: {
    backgroundColor: '#175CA4',
    width: responsiveWidth(35),
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(55),
    marginTop: responsiveHeight(20),
    justifyContent: 'center',
  },
  exitButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'normal',
    fontFamily: 'Poppins-Regular',
  },
  modalExitContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalExitContent: {
    backgroundColor: 'white',
    padding: responsiveWidth(5),
    borderRadius: responsiveWidth(5),
    height: responsiveHeight(20),
    width: responsiveWidth(75),
  },
  modalText: {
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  modalButton: {
    backgroundColor: '#175CA4',
    width: responsiveWidth(65),
    height: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(1.5),
  },
  modalButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'normal',
    fontFamily: 'Poppins-Regular',
  },
});

export default Activity1;
