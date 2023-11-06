import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, ScrollView,Modal,TouchableOpacity } from 'react-native';
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomSheet,ButtonGroup,Switch} from '@rneui/themed';
const AssessmentForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email,setEmail]=useState('');
  const [patientFirstName,setPatientFirstName]=useState('');
  const [patientLastName,setPatientLastName]=useState('');
  const [patientEmail,setPatientEmail]=useState('');
  const [patientBirth,setPatientBirth]=useState('');
  const [patientType,setPatientType]=useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const[diagnosis,setDiagnosis]=useState("");
  const[history,setHistory]=useState("")
  const [genderIndex, setGenderIndex] = useState(-1);
  const [checked, setChecked] = useState(false);
  const [obejctive, setobejctive] = useState(-1);

  const toggleDropdown = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };
  const data = [
    {key:'1', value:'Amblyopia with intermittent strabismus'},
    {key:'2', value:'Anisometropic Amblyopia'},
    {key:'3', value:'Isometric Amblyopia'},
    {key:'4', value:'Refractive Amblyopia'},
    {key:'5', value:'Other(Please specify in below field'},
    {key:'6', value:'Cancel'},
]
const genderButtons = ['Male', 'Female', 'Other'];
const obejctiveRefraction=['Cyclopegic','Non-Cycloplegic']
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const handleFirstNameChange = (text) => {
    setFirstName(text);
  };
  
  const handleLastNameChange = (text) => {
    setLastName(text);
  };
  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePatientFirstNameChange = (text) => {
    setPatientFirstName(text);
  };
  const handlePatientLastNameChange = (text) => {
    setPatientLastName(text);
  };
  const handlePatientEmailChange = (text) => {
    setPatientEmail(text);
  };
  const handlePatientBirthChange = (date) => {
    const selectedDate = date.dateString;
    const [year, month, day] = selectedDate.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    setPatientBirth(formattedDate);
    setIsCalendarVisible(false);
  };
  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };
  const toggleSwitch = () => {
    setChecked(!checked);
  };
  const handleDiagnosisChange = (text) => {
    setDiagnosis(text);
  };
  const handleHistoryChange = (text) => {
    setHistory(text);
  };
  return (
<ScrollView keyboardShouldPersistTaps="handled">
    <View style={styles.container}>
      <Text>DOCTOR DETAILS</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleFirstNameChange}
          value={firstName}
        />
        <Text style={firstName ? styles.floatingLabel : styles.label}>First Name <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleLastNameChange}
          value={lastName}
        />
        <Text style={lastName ? styles.floatingLabel : styles.label}>Last Name <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleEmailChange}
          value={email}
        />
        <Text style={email ? styles.floatingLabel : styles.label}>Email <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <Text>PATIENT DETAILS</Text>
            <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handlePatientFirstNameChange}
          value={patientFirstName}
        />
        <Text style={patientFirstName ? styles.floatingLabel : styles.label}>Patient First Name <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handlePatientLastNameChange}
          value={patientLastName}
        />
        <Text style={patientLastName ? styles.floatingLabel : styles.label}>Patient Last Name <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handlePatientEmailChange}
          value={patientEmail}
        />
        <Text style={patientEmail ? styles.floatingLabel : styles.label}>Patient Email <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={patientBirth}
          onFocus={toggleCalendar}
        />
        <Text style={patientBirth ? styles.floatingLabel : styles.label}>Date of Birth <Text style={{color:'red'}}>*</Text></Text>
      </View>
      {isCalendarVisible && (
              <Modal visible={isCalendarVisible} animationType="slide">
              <View style={styles.Calendar_Container}>
                  <View style={styles.Calendar_Header}>
                      <Text style={styles.Calendar_Header_Text}>Select Date</Text>
                      <TouchableOpacity onPress={() => setIsCalendarVisible(false)}>
                          <Icon name="close" size={24} color="white" style={styles.CloseIcon} />
                      </TouchableOpacity>
                  </View>
                  <Calendar onDayPress={handlePatientBirthChange} maxDate={today}/>
              </View>
          </Modal>
  )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={patientType}
            onFocus={toggleDropdown}
          />
          <Text style={patientType ? styles.floatingLabel : styles.label}>
            Type Of Patient <Text style={{ color: 'red' }}>*</Text>
          </Text>
        </View>

        <BottomSheet
          isVisible={isBottomSheetVisible}
          onBackdropPress={() => setIsBottomSheetVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            {data.map(item => (
              <TouchableOpacity
                key={item.key}
                onPress={() => {
                  setPatientType(item.value);
                  setIsBottomSheetVisible(false);
                }}
              >
                <Text style={styles.dropdownItem}>{item.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheet>
      <View style={styles.horizontalLine} />
      <Text>Gender</Text>
        <ButtonGroup
          buttons={genderButtons}
          selectedIndex={genderIndex}
          onPress={(selectedIndex) => setGenderIndex(selectedIndex)}
          containerStyle={styles.genderContainer}
        />
              <View style={styles.horizontalLine} />
              <View style={styles.switchContainer}>
          <Switch
            value={checked}
            onValueChange={toggleSwitch}
          />
          <Text style={styles.switchLabel}>Is the patient currently wearing a patch?</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.switchContainer}>
          <Switch
            value={checked}
            onValueChange={toggleSwitch}
          />
          <Text style={styles.switchLabel}>Is the patient currently wearing a filter?</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.switchContainer}>
          <Switch
            value={checked}
            onValueChange={toggleSwitch}
          />
          <Text style={styles.switchLabel}>Is the patient currently using a prism?</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.switchContainer}>
          <Switch
            value={checked}
            onValueChange={toggleSwitch}
          />
          <Text style={styles.switchLabel}>Is the patient currently wearing glasses or contact lenses with the best possible correction?</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleDiagnosisChange}
          value={diagnosis}
          multiline
        />
        <Text style={diagnosis ? styles.floatingLabel : styles.label}>Clinical Diagnosis <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleHistoryChange}
          value={history}
          multiline
        />
        <Text style={history ? styles.floatingLabel : styles.label}>Treatment History <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <Text>Gender</Text>
        <ButtonGroup
          buttons={obejctiveRefraction}
          selectedIndex={obejctive}
          onPress={(selectedIndex) => setobejctive(selectedIndex)}
          containerStyle={styles.genderContainer}
        />
              <View style={styles.horizontalLine} />
              <Text>SPH</Text>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:responsiveWidth(15),
  },
  inputContainer: {
    marginTop:responsiveWidth(5),
  },
  input: {
    padding: 15,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginLeft:15,
    marginRight:15,
    borderRadius:10
  },
  label: {
    position: 'absolute',
    left: 25,
    top: 20,
    paddingHorizontal: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'black',
  },
  floatingLabel: {
    position: 'absolute',
    left: 10,
    top: -8,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'blue',
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,  
    marginTop:25    
  },
  dropdownContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  dropdownItem: {
    paddingVertical: 10,
    fontSize: 16,
  },
  genderContainer: {
    height: 40,
    marginTop: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 16,
    flex:1
  },
});

export default AssessmentForm;
