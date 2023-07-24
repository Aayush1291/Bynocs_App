import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Modal,
} from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

// const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'gray'];
const colors = [
  '#3781C1',
  '#3583B4',
  '#3B84A7',
  '#39859C',
  '#3F8782',
  '#588473',
  '#588473',
  '#6C8164',
  '#837B5D',
  '#907660',
  '#9E6E6F',
  '#9F6D7C',
  '#9C6D89',
  '#927099',
  '#8F6FA4',
  '#8073B2',
];
const Activity2 = (navigation) => {
  const [isCorrect, setIsCorrect] = useState(false); // State variable to store the correctness of the color array
  const [selectedOption, setSelectedOption] = useState(null); // State variable to store the selected color array index
  const [shouldReset, setShouldReset] = useState(false); // State variable to trigger reset
  const [showRefreshModal, setShowRefreshModal] = useState(false); // State variable to control modal visibility
  const [showExitModal, setShowExitModal] = useState(false); // State variable to control modal visibility

  // Function to generate the color arrays
  const generateColorArrays = () => {
    const swappedColors2 = [...colors];
    let index1 = Math.floor(Math.random() * (colors.length - 1)); // Ensure index1 is within bounds to have a valid index2
    let index2 = index1 + 1; // Set index2 to be one position ahead of index1

    [swappedColors2[index1], swappedColors2[index2]] = [
      swappedColors2[index2],
      swappedColors2[index1],
    ];

    const swappedColors3 = [...colors];
    index1 = Math.floor(Math.random() * (colors.length - 2)); // Ensure index1 is within bounds to have valid index2 and index3
    index2 = index1 + 1;
    let index3 = index1 + 2;

    // Check if index3 is out of bounds and adjust index2 and index1 accordingly
    if (index3 >= colors.length) {
      index3 = index1 - 1;
      index2 = index1 - 2;
    }

    [swappedColors3[index1], swappedColors3[index2], swappedColors3[index3]] = [
      swappedColors3[index3],
      swappedColors3[index1],
      swappedColors3[index2],
    ];

    return [colors, swappedColors2, swappedColors3].sort(
      () => Math.random() - 0.5,
    );
  };

  // Store the generated color arrays outside the component's scope
  const randomOptionsRef = React.useRef(generateColorArrays());
  const randomOptions = randomOptionsRef.current;

  function handleColorClick(option, index) {
    setSelectedOption(index);
    const correct = JSON.stringify(option) === JSON.stringify(colors);
    setIsCorrect(correct); // Update the isCorrect state based on the correctness

    if (!correct) {
      setShowRefreshModal(true); // Show the modal when an incorrect option is selected
    }
  }

  function handleReplay() {
    setShouldReset(true);
    setShowRefreshModal(false); // Close the modal when replay is clicked
  }

  const handleExit = () => {
    setShowExitModal(false);
    navigation.navigate('Home'); // Navigate back to the home page
  };

  useEffect(() => {
    if (shouldReset) {
      randomOptionsRef.current = generateColorArrays();
      setSelectedOption(null);
      setIsCorrect(false);
      setShouldReset(false);
    }
  }, [shouldReset]);

  // function handleGoBack() {
  //   setShowModal(false); // Close the modal when "Go Back" is clicked
  // }

  return (
    <View style={styles.container}>
      {randomOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={{
            height: responsiveWidth(9),
            marginBottom: responsiveHeight(10),
            borderColor:
              selectedOption === index
                ? isCorrect
                  ? 'green'
                  : 'red'
                : 'black',
            borderWidth:
              selectedOption === index
                ? responsiveWidth(0.5)
                : responsiveWidth(0.5),
            justifyContent: 'center',
          }}
          onPress={() => handleColorClick(option, index)}>
          <View style={styles.row}>
            {option.map((color, subIndex) => (
              <View
                key={subIndex}
                style={[styles.square, {backgroundColor: color}]}
              />
            ))}
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => setShowExitModal(true)}
        style={styles.exitButton}>
        <Text style={styles.exitButtonText}>Exit</Text>
      </TouchableOpacity>
      {isCorrect && <Text style={styles.modalText}>Correct!</Text>}

      <Modal
        visible={showRefreshModal}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalRefreshContainer}>
          <View style={styles.modalRefreshContent}>
            <Text style={styles.modalText}>Opps, Wrong Answer.</Text>
            <Text
              style={[styles.modalText, {marginBottom: responsiveHeight(2)}]}>
              Please try again.
            </Text>
            <TouchableOpacity onPress={handleReplay} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
              <Text style={styles.goBackButtonText}>Go Back</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
      <Modal visible={showExitModal} animationType="slide" transparent={true}>
        <View style={styles.modalExitContainer}>
          <View style={styles.modalExitContent}>
            <Text
              style={[styles.modalText, {marginBottom: responsiveHeight(2)}]}>
              Well Done.
            </Text>
            <TouchableOpacity onPress={handleExit} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
              <Text style={styles.goBackButtonText}>Go Back</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Activity2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: responsiveWidth(0.1),
    borderLeftColor: 'black',
    borderTopWidth: responsiveWidth(0.1),
    borderTopColor: 'black',
    borderBottomWidth: responsiveWidth(0.1),
    borderBottomColor: 'black',
    marginHorizontal: responsiveWidth(1),
  },
  square: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    borderRightWidth: responsiveWidth(0.1),
    borderRightColor: 'black',
  },
  modalRefreshContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalRefreshContent: {
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
  goBackButton: {
    backgroundColor: '#FF0000',
    width: responsiveWidth(65),
    height: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: responsiveWidth(2),
  },
  goBackButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'normal',
  },
  exitButton: {
    backgroundColor: '#175CA4',
    width: responsiveWidth(35),
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(55),
    // bottom: responsiveHeight(10),
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
    height: responsiveHeight(16),
    width: responsiveWidth(75),
  },
});
