import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


function AddPage2({ handleCloseAddPageThird }) {
  const navigation = useNavigation();
  

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const [showCalendar2, setShowCalendar2] = useState(false);
  const [selectedDate2, setSelectedDate2] = useState(null);

  const handleDateSelect2 = (date) => {
    setSelectedDate2(date);
    setShowCalendar2(false);
  };



  const handleBackPress2 = () => {
    handleCloseAddPageThird();
    navigation.navigate('ThirdPage')
  };

  const [showToTimeInput, setShowToTimeInput] = useState(false);
  const [showFromTimeInput, setShowFromTimeInput] = useState(false);
  const [toTime, setToTime] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [isFromTimePickerVisible, setFromTimePickerVisibility] = useState(false);
  const [isToTimePickerVisible, setToPickerVisibility] = useState(false);

  // const handleToTimeIconPress = () => {
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
      Alert.alert('Waning!', 'Selected time should be between From time and 9:00 PM')
      setToTime(null);
      hideTimePicker();
    }
  };
 
  const handleData2 = ()=>{
    const formData={    
      selectedDate,
      selectedDate2,
      toTime,
      fromTime,
    };
    fetch("https://retoolapi.dev/SGpNie/time", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
  })
  .then((response) => {
    if (response.ok) {
        Alert.alert('Time off successfully added!', 'Refresh the page to see schedule.');
     
      } else {
        Alert.alert('Error');
    }
})
.catch((error) => {
    console.error(error);
    Alert.alert('Error', 'An error occurred while adding the time off');
});
   }


   const formatSelectedDate = (dateString) => {
    if (!dateString) return null;
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const date = String(dateObj.getDate()).padStart(2, '0');
    return `${date}-${month}-${year}`;
  };


  return (
    <View style={styles.card}>
    <View style={[styles.row, styles.rowWithLine, { marginTop: 20 }]}>
      <Text style={styles.label}>Pick Start Date</Text>
      {selectedDate && <Text style={{color:'#034694',marginRight:-123}}>{formatSelectedDate(selectedDate)}</Text>}
       <TouchableOpacity style={[styles.iconContainer,{marginLeft:-12}]} onPress={() => setShowCalendar(true)}>
      
        <Image source={require('../assets/cal.png')} style={styles.customIconCall} />
        
      </TouchableOpacity>
      
    </View>

    <View style={[styles.row, styles.rowWithLine, { marginTop: 5 }]}>
      <Text style={styles.label}>Pick End Date</Text>
      {selectedDate2 && <Text style={{color:'#034694',marginRight:-130}}>{formatSelectedDate(selectedDate2)}</Text>}
      <TouchableOpacity style={[styles.iconContainer,{marginLeft:-12}]} onPress={() => setShowCalendar2(true)}>
        <Image source={require('../assets/cal.png')} style={styles.customIconCall} />
      </TouchableOpacity>
   
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
            onPress={handleBackPress2}
          >
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.greenButton]}
            onPress={() => {
      handleData2();
      handleBackPress2();
    }}>
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={showCalendar} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={[styles.closeButton,]} onPress={() => setShowCalendar(false)}>
          <Text style={{fontSize:18, marginLeft:165,}}>Close</Text>
          </TouchableOpacity>
          <Calendar
            style={{borderRadius:5,elevation:10,marginLeft:15, marginRight:15,marginVertical:300}}
           
            onDayPress={(day) => handleDateSelect(day.dateString)}
            hideExtraDays
            markedDates={{
              [selectedDate]: { selected: true, disableTouchEvent: false },
            }}
          />
        </View>
      </Modal>

      <Modal visible={showCalendar2} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowCalendar2(false)}>
           <Text style={{fontSize:18, marginLeft:165,}}>Close</Text>
          </TouchableOpacity>
      
           <Calendar
            style={{borderRadius:5,elevation:10,marginLeft:15, marginRight:15,marginVertical:300}}
     
            onDayPress={(day) => handleDateSelect2(day.dateString)}
            hideExtraDays
            markedDates={{
              [selectedDate]: { selected: true, disableTouchEvent: false },
            }}
         
          />
        </View>
      </Modal>
      </View>
    
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
  width: '99.5%', 
  height: 350, 
  marginVertical: -50, 
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
    borderBottomColor: '#fff',
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
  text: {
    padding:5,
    // borderWidth: 1,
    // borderColor: '#ccc',
    color:'#034694',
    borderRadius: 5,
    fontSize: 16,
    height: 35,
    marginRight: 8,
    position: 'absolute', 
    left: responsiveWidth(50), 
    top: responsiveHeight(-0.7),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    
  },
  textinput: {
    padding:5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 13,
    height: 35,
    color: '#034694',
    marginRight: 8,
    position: 'absolute', 
    left: 186 , 
    top: -7,
    width:70,
  },
  iconContainer: {
    marginLeft:1,
    
  },
  
 
  
});

export default AddPage2;