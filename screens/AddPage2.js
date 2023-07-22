import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';


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
    navigation.reset({
      index: 0,
      routes: [{ name: 'ThirdPage' }],
    });
  };

  const [showToTimeInput, setShowToTimeInput] = useState(false);
  const [showFromTimeInput, setShowFromTimeInput] = useState(false);
  const [toTime, setToTime] = useState('');
  const [fromTime, setFromTime] = useState('');

  const handleToTimeIconPress = () => {
    setShowToTimeInput(!showToTimeInput);
  };

  const handleFromTimeIconPress = () => {
 
    setShowFromTimeInput(!showFromTimeInput);
  };
 
 

  const handleToTimeInputChange = (text) => {
    setToTime(text);
  };

  const handleFromTimeInputChange = (text) => {
    setFromTime(text);
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
        Alert.alert('Time off successfully added!');
     
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
      <TouchableOpacity style={styles.iconContainer} onPress={handleFromTimeIconPress}>
        <Image source={require('../assets/cal.png')} style={styles.customIconCall} />
      </TouchableOpacity>
      {showFromTimeInput && ( 
        <TextInput
          style={styles.textinput}
          value={fromTime}
          onChangeText={handleFromTimeInputChange}
        />
      )}
    </View>
      
    <View style={[styles.row, styles.rowWithLine]}>
      <Text style={styles.label}>To Time</Text>
      <TouchableOpacity style={styles.iconContainer} onPress={handleToTimeIconPress}>
        <Image source={require('../assets/cal.png')} style={styles.customIconCall} />
      </TouchableOpacity>
      {showToTimeInput && ( 
        <TextInput
          style={styles.textinput}
          value={toTime}
          onChangeText={handleToTimeInputChange}
        />
      )}
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
  textInput: {
    flex: 1,
    height: 40, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    paddingHorizontal: 10,
    marginLeft: 80,
    textAlignVertical: 'bottom', 
    fontSize:14,
    color:'black',
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