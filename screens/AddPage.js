import React, { useEffect, useState } from 'react';
 
import { Alert,View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, } from 'react-native';
 
import { useNavigation } from '@react-navigation/native';
 
import ModalDropdown from 'react-native-modal-dropdown';
 
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import DateTimePickerModal from 'react-native-modal-datetime-picker';
 
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
 
 
function AddPage({ handleCloseAddPage}) {
 
  const navigation = useNavigation();
 
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 
  const [selectedWeekday, setSelectedWeekday] = useState('');
 
  const [showTextbox, setShowTextbox] = useState(false);
 
  const [refresh, setRefresh]=useState(false);
 
  const handleBackPress = async () => {
 
    handleCloseAddPage();
 
    // navigation.reset({
 
    //   index: 0,
 
    //   routes: [{ name: 'SecondPage' }],
 
    // });

    navigation.navigate('SecondPage');
 
  };
 
  const [showToTimeInput, setShowToTimeInput] = useState(false);
 
  const [showFromTimeInput, setShowFromTimeInput] = useState(false);
 
  const [start, setStart] = useState('');
 
  const [end, setEnd] = useState('');
 
  const [username, setUserName] = useState('');
 
  const [toTime, setToTime] = useState('');
 
  const [fromTime, setFromTime] = useState('');
 
  const [isFromTimePickerVisible, setFromTimePickerVisibility] = useState(false);
 
  const [isToTimePickerVisible, setToPickerVisibility] = useState(false);
 
  useEffect(()=>{
 
    retrieveUserName();
 
  },[])
 
 
  const retrieveUserName = async () => {
 
    try {
 
      const storedUserName = await AsyncStorage.getItem('UserName');
 
      console.log(storedUserName);
 
      if (storedUserName) {
 
        setUserName(storedUserName);
 
      }
 
    } catch (error) {
 
      console.error('Error retrieving userName from AsyncStorage:', error);
 
    }
 
  };
 
 
    const showFromTimePicker = () => {
 
    setFromTimePickerVisibility(true);
 
  };
 
 
  const showToTimePicker = () => {
 
    setToPickerVisibility(true);
 
  };
 
 
  const hideTimePicker = () => {
 
    setFromTimePickerVisibility(false);
 
    setToPickerVisibility(false)
 
  };
 
 
  const handleFromTime = time => {
    const selectedTime = new Date(time);
    const x = selectedTime.toLocaleTimeString().split(' ');
    const x1 = selectedTime.toLocaleTimeString().split(':');
    const formattedTime = x1[0] + ':' + x1[1] + ' ' + x[1];

    // Convert the selected time to 24-hour format to compare easily
    const selectedTime24hr = selectedTime.getHours() + (x[1] === 'PM' ? 12 : 0);

    // Convert 9:00 PM to 24-hour format (21:00)
    const ninePMTime = new Date();
    ninePMTime.setHours(21, 0, 0, 0);

    if (selectedTime24hr >= 9 && selectedTime <= ninePMTime) {
      setFromTime(formattedTime);
      console.log('A date has been picked: ', x);
      hideTimePicker();
      // setErrorMessage('');
    } else {
      // setErrorMessage('Selected time should be between 9:00 AM and 9:00 PM');
      Alert.alert("Warning!", 'Selected time should be between 9:00 AM and 9:00 PM');
      setFromTime(null);
      hideTimePicker();
    }
  };
 
 
  const handleToTime = time => {
    const selectedTime = new Date(time);
    const x = selectedTime.toLocaleTimeString().split(' ');
    const x1 = selectedTime.toLocaleTimeString().split(':');
    const formattedTime = x1[0] + ':' + x1[1] + ' ' + x[1];

    // Convert the selected time to 24-hour format to compare easily
    const selectedTime24hr = selectedTime.getHours() + (x[1] === 'PM' ? 12 : 0);

    // Convert the fromTime to 24-hour format
    const fromTime24hr = parseInt(fromTime.split(':')[0]) + (fromTime.split(' ')[1] === 'PM' ? 12 : 0);

    // Convert 9:00 PM to 24-hour format (21:00)
    const ninePMTime = new Date();
    ninePMTime.setHours(21, 0, 0, 0);

    if (selectedTime24hr >= fromTime24hr && selectedTime <= ninePMTime) {
      setToTime(formattedTime);
      console.log('A date has been picked: ', x);
      hideTimePicker();
      // setErrorMessage('');
    } else {
      // setErrorMessage('Selected time should be between fromTime and 9:00 PM');
      Alert.alert('Waning!', 'Selected time should be between From Time and 9:00 PM')
      setToTime(null);
      hideTimePicker();
    }
  };
 
 
  // const handleToTimeIconPress = () => {
 
  //   showTimePicker();
 
  //   setShowToTimeInput(!showToTimeInput);
 
  // };
 
 
  // const handleFromTimeIconPress = () => {
 
  //   setShowFromTimeInput(!showFromTimeInput);
 
  // };
 
 
  // const handleToTimeInputChange = (text) => {
 
  //   setToTime(text);
 
  // };
 
 
  // const handleFromTimeInputChange = (text) => {
 
  //   setFromTime(text);
 
  // };
 
  const renderDropdownRow = (rowData, rowID,) => (
 
    <View style={styles.dropdownRow}>
 
      <Text style={[styles.dropdownRowText, { color: 'black' }]}>
 
        {rowData}
 
      </Text>
 
    </View>
 
  );
 
   const handleData = ()=>{
 
    const formData={    
 
      selectedWeekday,
 
      fromTime,
 
      toTime,
 
      username
 
    
 
    };
 
    fetch("https://retoolapi.dev/D3HKGH/data", {
 
      method: 'POST',
 
      headers: {
 
          'Content-Type': 'application/json',
 
      },
 
      body: JSON.stringify(formData),
 
  })
 
  .then((response) => {
 
    if (response.ok) {
 
        Alert.alert('Time slot successfully added!', 'Refresh the page to see schedule.');
 
     
 
      } else {
 
        Alert.alert('Error');
 
    }
 
})
 
.catch((error) => {
 
    console.error(error);
 
    Alert.alert('Error', 'An error occurred while adding the time slot');
 
});
 
   }
 
 
 
  return (
 
    <ScrollView contentContainerStyle={styles.container}>
 
      <View style={styles.card}>
 
        <View style={[styles.row, styles.rowWithLine, { marginTop: 20 }]}>
 
          <Text style={styles.label}>Weekday</Text>
 
          <View style={styles.weekdayContainer}>
 
            <Text style={styles.selectedWeekdayText}>{selectedWeekday}</Text>
 
            <ModalDropdown
 
              options={weekdays}
 
              defaultValue="Select Weekday"
 
              style={styles.dropdownButton}
 
              textStyle={styles.dropdownRowText}
 
              dropdownStyle={styles.dropdownContainer}
 
              onSelect={(index, value) => setSelectedWeekday(value)}
 
              renderRow={renderDropdownRow}
 
            >
 
              <Image
 
                source={require('../assets/drop.png')}
 
                style={styles.customIconEdit}
 
              />
 
            </ModalDropdown>
 
          </View>
 
        </View>
 
 
        
 
        <View style={[styles.row, styles.rowWithLine]}>
 
        <Text style={styles.label}>From Time</Text>
 
        <TouchableOpacity style={styles.iconContainer} onPress={()=>{
 
          showFromTimePicker();
 
        }}>
 
          <Image source={require('../assets/cal.png')} style={styles.customIconCall} />
 
        </TouchableOpacity>
 
        <DateTimePickerModal
 
        isVisible={isFromTimePickerVisible}

        mode="time"
 
        onConfirm={handleFromTime}
 
        onCancel={hideTimePicker}
 
      />
          <Text style={styles.text}>{fromTime}</Text>
 
      </View>
 
      
 
      <View style={[styles.row, styles.rowWithLine]}>
 
        <Text style={styles.label}>To Time</Text>
 
        <TouchableOpacity style={styles.iconContainer} onPress={()=>{
 
          showToTimePicker();
 
        }}>
 
          <Image source={require('../assets/cal.png')} style={styles.customIconCall} />
 
        </TouchableOpacity>
 
        <DateTimePickerModal
 
        isVisible={isToTimePickerVisible}
 
        mode="time"
 
        onConfirm={handleToTime}
 
        onCancel={hideTimePicker}
 
      /> 
          <Text style={styles.text}>{toTime}</Text> 
      </View>
 
    
 
        
 
        <View style={styles.buttonContainer}>
 
          <TouchableOpacity
 
            style={[styles.button, styles.blueButton]}
 
            onPress={handleBackPress}
 
          >
 
            <Text style={styles.buttonText}>BACK</Text>
 
          </TouchableOpacity>
 
 
          <TouchableOpacity
 
            style={[styles.button, styles.greenButton]}
 
            onPress={() => {
 
      handleData();
 
      handleBackPress();
 
    }}>
 
            <Text style={styles.buttonText}>ADD</Text>
 
          </TouchableOpacity>
 
        </View>
 
      </View>
 
    </ScrollView>
 
  );
 
}  
 
 
const styles = StyleSheet.create({
 
  
 
container: {
 
  flexGrow: 1,
 
  justifyContent: 'center',
 
  alignItems: 'center',
 
},   
 
selectedTimeText: {
 
  marginLeft: 10, 
 
 
 
},
 
card: {
 
  backgroundColor: 'white',
 
  borderRadius: 7,
 
  elevation: 4,
 
  width: '99%', 
 
  height: 300, 
 
  marginVertical: 10, 
 
  padding: 20,
 
marginBottom:200,
 
},
 
  row: {
 
    flexDirection: 'row',
 
    alignItems: 'center',
 
    marginBottom: 20,
 
    marginTop: 5,
 
    justifyContent: 'space-between', 
 
  },
 
  rowWithLine: {
 
    borderBottomWidth: 1,
 
    borderBottomColor: '#bcbcbc',
 
    paddingBottom: 10,
 
  },
 
  label: {
 
    fontSize: 16,
 
    marginRight: 10,
 
    color: 'black',
 
  },
 
  buttonContainer: {
 
    flexDirection: 'row',
 
    justifyContent: 'space-between',
 
    marginTop: 'auto',
 
  },
 
  button: {
 
    width: '46%',
 
    height: 40,
 
    elevation: 5,
 
    justifyContent: 'center',
 
    alignItems: 'center',
 
  },
 
  blueButton: {
 
    backgroundColor: '#034694',
 
  },
 
  greenButton: {
 
    backgroundColor: '#17B169',
 
  },
 
  buttonText: {
 
    color: 'white',
 
  },
 
 
  weekdayContainer: {
 
    flexDirection: 'row',
 
    alignItems: 'center',
 
  
 
  },
 
 
 
  selectedWeekdayText: {
 
    fontSize: 16,
 
    color: '#034694',
 
    marginRight: 10, 

  },
 
 
  customIconEdit: {
 
    width: 15,
 
    height: 15,
 
  },
 
 
  
 
  dropdownButton: {
 
    justifyContent: 'center',
 
    alignItems: 'center',
 
    marginLeft: 5, 
 
  },
 
 
  
 
  dropdownContainer: {
 
    width: 150, 
 
    marginTop: 10,
 
    marginLeft: 10, 
 
   height:180,
 
  },
 
  dropdownRowText: {
 
    fontSize: 13,
 
    color: 'black',
 
    paddingVertical: 4,
 
  },
 
  customIconCal:{
 
    width: 20,
 
    height: 20,
 
    marginLeft:20,
 
  },
 
  customIconCall:{
 
    width: 20,
 
    height: 20,
 
    marginLeft:90,
 
  },
 
  scrollViewContent: {
 
    flexGrow: 0.5,
 
    justifyContent: 'center',
 
    alignItems: 'center',
 
    paddingTop: 5,
 
    paddingBottom: 40, 
 
  
 
  },
 
 
  inputContainer: {
 
    flexDirection: 'row',
 
    alignItems: 'center',
 
    flex: 1,
 
    
 
  },
 
  text: {
 
    padding:5,
 
    // borderWidth: 1,
 
    // borderColor: '#ccc',
 
    borderRadius: 5,
 
    fontSize: 16,
 
    height: 35,
 
    color: '#034694',
 
    marginRight: 8,
 
    position: 'absolute', 
 
    left: responsiveWidth(50), 
 
    top: responsiveHeight(-0.7),
 
  },
 
  iconContainer: {
 
    marginLeft:1,
 
    
 
  },
 
 
 
});
 
 
export default AddPage;