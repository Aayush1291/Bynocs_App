import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, {useState} from 'react'
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import DotsSquare from './DotsSquare'
const Activity3 = ({navigation}) => {
  const [showExitModal, setShowExitModal] = useState(false); // State variable to control modal visibility

  const handleExit = () => {
    setShowExitModal(false);
    navigation.navigate('Home'); // Navigate back to the home page
  };
  return (
<View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#303030'}}>
      <DotsSquare />
      <TouchableOpacity
        onPress={() => setShowExitModal(true)}
        style={styles.exitButton}>
        <Text style={styles.exitButtonText}>Exit</Text>
      </TouchableOpacity>

      <Modal visible={showExitModal} animationType="slide" transparent={true}>
        <View style={styles.modalExitContainer}>
          <View style={styles.modalExitContent}>
            <Text
              style={[styles.modalText, {marginBottom: responsiveHeight(2)}]}>
              Well Done!
            </Text>
            <TouchableOpacity onPress={handleExit} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  )
}
const styles = StyleSheet.create({
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
  exitButton: {
    backgroundColor: '#175CA4',
    width: responsiveWidth(35),
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(2),
    marginLeft: responsiveWidth(55),
    marginTop: responsiveHeight(10),
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

export default Activity3