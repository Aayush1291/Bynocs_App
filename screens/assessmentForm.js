import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { TextInput,RadioButton } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomSheet, ButtonGroup, Switch } from '@rneui/themed';
const AssessmentForm = () => {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [patientFirstName, setPatientFirstName] = useState('');
  const [patientLastName, setPatientLastName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientBirth, setPatientBirth] = useState('');
  const [patientType, setPatientType] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [history, setHistory] = useState("")
  const [gender, setGender] = useState('');  
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [obejctive, setobejctive] = useState(-1);
  const [sphr, setSPHr] = useState('');
  const [sphl, setSPHl] = useState('');
  const [cylr, setCYLr] = useState('');
  const [cyll, setCYLl] = useState('');
  const [axisr, setAxisr] = useState('');
  const [axisl, setAxisl] = useState('');
  const [srsphr, srsetSPHr] = useState('');
  const [srsphl, srsetSPHl] = useState('');
  const [srcylr, srsetCYLr] = useState('');
  const [srcyll, srsetCYLl] = useState('');
  const [sraxisr, srsetAxisr] = useState('');
  const [sraxisl, srsetAxisl] = useState('');
  const [bcva, setBcva] = useState(-1);
  const [bcvar, setBcvar] = useState("");
  const [bcval, setBcval] = useState("");
  const [bcvaipd, setBcvaIpd] = useState("");
  const [prismr, setPrismr] = useState("");
  const [prisml, setPrisml] = useState("");
  const [baser, setBaser] = useState("");
  const [basel, setBasel] = useState("");
  const [interl, setInterl] = useState("");
  const [interr, setInterr] = useState("");
  const [nearr, setNearr] = useState("");
  const [nearl, setNearl] = useState("");
  const [anterl, setAnterl] = useState("");
  const [anterr, setAnterr] = useState("");
  const [pnterl, setPnterl] = useState("");
  const [pnterr, setPnterr] = useState("");
  const [covernr, setcovernr] = useState("");
  const [coverdr, setcoverdr] = useState("");
  const [strenr, setstrenr] = useState("");
  const [streerdr, setstredr] = useState("");
  const [typestrenr, settypestrenr] = useState("");
  const [typestredr, settypestredr] = useState("");
  const [comments, setComments] = useState("")
  const [bcvaright, setBcvaRight] = useState('');
  const [bcvaleft, setBcvaLeft] = useState('');
  const [isODDropdownVisible, setIsODDropdownVisible] = useState(false);
  const [isOSDropdownVisible, setIsOSDropdownVisible] = useState(false);
  
  const toggleDropdown = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };
  const toggleOdDropdown = () => {
    setIsODDropdownVisible(!isODDropdownVisible);
  };
  const toggleOsDropdown = () => {
    setIsOSDropdownVisible(!isOSDropdownVisible);
  };
  const data = [
    { key: '1', value: 'Amblyopia with intermittent strabismus' },
    { key: '2', value: 'Anisometropic Amblyopia' },
    { key: '3', value: 'Isometric Amblyopia' },
    { key: '4', value: 'Refractive Amblyopia' },
    { key: '5', value: 'Other(Please specify in below field' },
    { key: '6', value: 'Cancel' },
  ]
  const od = [
    { key: '1', value: 'Foveal' },
    { key: '2', value: 'Eccentric' },
    { key: '3', value: 'Cancel' },
  ]
  const os = [
    { key: '1', value: 'Foveal' },
    { key: '2', value: 'Eccentric' },
    { key: '3', value: 'Cancel' },
  ]
  const obejctiveRefraction = ['Cyclopegic', 'Non-Cycloplegic']
  const Bcva = ['LogMAR', 'Decimal', 'Snellens (feet)', 'Snellens (meters)']
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
  const toggleSwitch1 = () => {
    setChecked1(!checked1);
  };
  const toggleSwitch2 = () => {
    setChecked2(!checked2);
  };
  const toggleSwitch3 = () => {
    setChecked3(!checked3);
  };
  const toggleSwitch4 = () => {
    setChecked4(!checked4);
  };
  const handleDiagnosisChange = (text) => {
    setDiagnosis(text);
  };
  const handleHistoryChange = (text) => {
    setHistory(text);
  };
  const handleSphChanger = (text) => {
    setSPHr(text);
  };
  const handleSphChangel = (text) => {
    setSPHl(text);
  };
  const handleCylChanger = (text) => {
    setCYLr(text);
  };
  const handleCylChangel = (text) => {
    setCYLl(text);
  };
  const handleAxisChanger = (text) => {
    setAxisr(text);
  };
  const handleAxisChangel = (text) => {
    setAxisl(text);
  };

  const handleSrSphChanger = (text) => {
    srsetSPHr(text);
  };
  const handleSrSphChangel = (text) => {
    srsetSPHl(text);
  };
  const handleSrCylChanger = (text) => {
    srsetCYLr(text);
  };
  const handleSrCylChangel = (text) => {
    srsetCYLl(text);
  };
  const handleSrAxisChanger = (text) => {
    srsetAxisr(text);
  };
  const handleSrAxisChangel = (text) => {
    srsetAxisl(text);
  };
  const handleBcvar = (text) => {
    setBcvar(text);
  };
  const handleBcval = (text) => {
    setBcval(text);
  };
  const handleBcvaipd = (text) => {
    setBcvaIpd(text);
  };
  const handlePrismr = (text) => {
    setPrismr(text);
  };
  const handlePrisml = (text) => {
    setPrisml(text);
  };
  const handleBaser = (text) => {
    setBaser(text);
  };
  const handleBaserl = (text) => {
    setBasel(text);
  };
  const handleinterr = (text) => {
    setInterr(text);
  };
  const handleinterl = (text) => {
    setInterl(text);
  };
  const handlenearr = (text) => {
    setNearr(text);
  };
  const handlenearl = (text) => {
    setNearl(text);
  };
  const handleanterr = (text) => {
    setAnterr(text);
  };
  const handleanterl = (text) => {
    setAnterl(text);
  };
  const handlepnterr = (text) => {
    setPnterr(text);
  };
  const handlepnterl = (text) => {
    setPnterl(text);
  };
  const handlecovernr = (text) => {
    setcovernr(text);
  };
  const handlecoverdr = (text) => {
    setcoverdr(text);
  };
  const handlestrenr = (text) => {
    setstrenr(text);
  };
  const handlestredr = (text) => {
    setstredr(text);
  };
  const handletypestrenr = (text) => {
    settypestrenr(text);
  };
  const handletypestredr = (text) => {
    settypestredr(text);
  };
  const handleComments = (text) => {
    setComments(text);
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: 'white' }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>DOCTOR DETAILS</Text>
        <View style={styles.inputContainer}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input}
            onChangeText={handleFirstNameChange}
            value={firstName}
            theme={{ colors: { primary: 'blue', } }}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                First Name
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input}
            onChangeText={handleLastNameChange}
            value={lastName}
            theme={{ colors: { primary: 'blue', } }}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Last Name
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input}
            onChangeText={handleEmailChange}
            value={email}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Email
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <Text style={styles.heading}>PATIENT DETAILS</Text>
        <View style={styles.inputContainer}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input}
            onChangeText={handlePatientFirstNameChange}
            value={patientFirstName}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Patient's First Name
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input}
            onChangeText={handlePatientLastNameChange}
            value={patientLastName}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Patient's Last Name
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input}
            onChangeText={handlePatientEmailChange}
            value={patientEmail}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Patient's Email
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input}
            value={patientBirth}
            onFocus={toggleCalendar}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Date Of Birth
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
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
              <Calendar onDayPress={handlePatientBirthChange} maxDate={today} />
            </View>
          </Modal>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input}
            value={patientType}
            onFocus={toggleDropdown}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Type of Patient
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
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
        <Text style={styles.heading}>Gender</Text>

    <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
      <View>
        <Text>Male</Text>
        <RadioButton value="male" />
      </View>
      <View>
        <Text>Female</Text>
        <RadioButton value="female" />
      </View>
    </RadioButton.Group>
        <View style={styles.horizontalLine} />
        <View style={styles.switchContainer}>
          <Switch
            value={checked1}
            onValueChange={toggleSwitch1}
            trackColor={{ true: '#175CA4' }}
            thumbColor={checked1 ? 'white' : '#175CA4'}
          />
          <Text style={styles.switchLabel}>Is the patient currently wearing a patch?</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.switchContainer}>
          <Switch
            value={checked2}
            onValueChange={toggleSwitch2}
            trackColor={{ true: '#175CA4' }}
            thumbColor={checked2 ? 'white' : '#175CA4'}
          />
          <Text style={styles.switchLabel}>Is the patient currently wearing a filter?</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.switchContainer}>
          <Switch
            value={checked3}
            onValueChange={toggleSwitch3}
            trackColor={{ true: '#175CA4' }}
            thumbColor={checked3 ? 'white' : '#175CA4'}
          />
          <Text style={styles.switchLabel}>Is the patient currently using a prism?</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.switchContainer}>
          <Switch
            value={checked4}
            onValueChange={toggleSwitch4}
            trackColor={{ true: '#175CA4' }}
            thumbColor={checked4 ? 'white' : '#175CA4'}
          />
          <Text style={styles.switchLabel}>Is the patient currently wearing glasses or contact lenses with the best possible correction?</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.inputContainer}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input}
            onChangeText={handleDiagnosisChange}
            value={diagnosis}
            multiline
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Clinical Diagnosis
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input}
            onChangeText={handleHistoryChange}
            value={history}
            multiline
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Treatment History
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <Text style={styles.heading}>Obejctive Refraction</Text>
        <ButtonGroup
          buttons={obejctiveRefraction}
          selectedIndex={obejctive}
          onPress={(selectedIndex) => setobejctive(selectedIndex)}
          containerStyle={styles.buttonGroupContainer}
          selectedButtonStyle={styles.selectedButtonStyle}
          textStyle={styles.textStyle}
          innerBorderStyle={styles.innerBorderStyle}
        />
        <View style={styles.horizontalLine} />
        <Text style={styles.heading}>SPH</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleSphChanger}
            value={sphr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OD (Right Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleSphChangel}
            value={sphl}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OS (Left Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <Text style={styles.heading}>CYL</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleCylChanger}
            value={cylr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OD (Right Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleCylChangel}
            value={cyll}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OS (Left Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <Text style={styles.heading}>AXIS</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleAxisChanger}
            value={axisr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OD (Right Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleAxisChangel}
            value={axisl}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OS (Left Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <View style={styles.horizontalLine} />
        <Text style={styles.heading1}>Subjective Refraction <Text style={{ color: 'red' }}>*</Text></Text>
        <Text style={styles.heading}>SPH</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleSrSphChanger}
            value={srsphr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OD (Right Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleSrSphChangel}
            value={srsphl}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OS (Left Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <Text style={styles.heading}>CYL</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleSrCylChanger}
            value={srcylr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OD (Right Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleSrCylChangel}
            value={srcyll}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OS (Left Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <Text style={styles.heading}>AXIS</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleSrAxisChanger}
            value={sraxisr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OD (Right Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleSrAxisChangel}
            value={sraxisl}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OS (Left Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <View style={styles.horizontalLine} />
        <Text style={styles.heading}>BCVA Unit<Text style={{ color: 'red' }}>*</Text></Text>
        <ButtonGroup
          buttons={Bcva}
          selectedIndex={bcva}
          onPress={(selectedIndex) => setBcva(selectedIndex)}
          containerStyle={styles.buttonGroupContainer}
          selectedButtonStyle={styles.selectedButtonStyle}
          textStyle={styles.textStyle}
          innerBorderStyle={styles.innerBorderStyle}
        />
        <View style={styles.horizontalLine} />

        <Text style={styles.heading1}>Visual Acuity <Text style={{ color: 'red' }}>*</Text></Text>
        <Text style={styles.heading}>BCVA</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleBcvar}
            value={bcvar}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OD (Right Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleBcval}
            value={bcval}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OS (Left Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input}
            onChangeText={handleBcvaipd}
            value={bcvaipd}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Interpupillary Distance (IPD in mm)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <View style={styles.horizontalLine} />
        {/* ye niche wala thik karna hai*/}
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            value={bcvaright}
            onFocus={toggleOdDropdown}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OD (Right Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            value={bcvaleft}
            onFocus={toggleOsDropdown}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OS (Left Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>

        <BottomSheet
          isVisible={isODDropdownVisible}
          onBackdropPress={() => setIsODDropdownVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            {od.map(item => (
              <TouchableOpacity
                key={item.key}
                onPress={() => {
                  setBcvaRight(item.value);
                  setIsODDropdownVisible(false);
                }}
              >
                <Text style={styles.dropdownItem}>{item.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheet>
        <BottomSheet
          isVisible={isOSDropdownVisible}
          onBackdropPress={() => setIsOSDropdownVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            {os.map(item => (
              <TouchableOpacity
                key={item.key}
                onPress={() => {
                  setBcvaLeft(item.value);
                  setIsOSDropdownVisible(false);
                }}
              >
                <Text style={styles.dropdownItem}>{item.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheet>
        <View style={styles.horizontalLine} />
        <Text style={styles.heading1}>Additional Refractive Parameters</Text>
        <Text style={styles.heading}>Prism</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handlePrismr}
            value={prismr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OD (Right Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handlePrisml}
            value={prisml}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OS (Left Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>

        <Text style={styles.heading}>Base</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleBaser}
            value={baser}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OD (Right Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleBaserl}
            value={basel}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OS (Left Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>

        <Text style={styles.heading}>Intermediate Add</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleinterr}
            value={interr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OD (Right Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleinterl}
            value={interl}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OS (Left Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <Text style={styles.heading}>Near Add</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handlenearr}
            value={nearr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OD (Right Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handlenearl}
            value={nearl}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OS (Left Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>

        <View style={styles.horizontalLine} />
        <Text style={styles.heading1}>Clinical Findings (Specify any ocular pathology)</Text>
        <Text style={styles.heading}>Anterior Segment</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleanterr}
            value={anterr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OD (Right Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handleanterl}
            value={anterl}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OS (Left Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>

        <Text style={styles.heading}>Posterior Segment</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handlepnterr}
            value={pnterr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OD (Right Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handlepnterl}
            value={pnterl}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                OS (Left Eye)
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>

        <View style={styles.horizontalLine} />
        <Text style={styles.heading1}>Sensory and Motor Findings <Text style={{ color: 'red' }}>*</Text></Text>
        <Text style={styles.heading}>Cover Test (Prism Dioptre)</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handlecovernr}
            value={covernr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Near
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handlecoverdr}
            value={coverdr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Distant
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>

        <Text style={styles.heading}>Stereopsis(Seconds or Arc)</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handlestrenr}
            value={strenr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Near
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handlestredr}
            value={streerdr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Distant
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>

        <Text style={styles.heading}> Type Stereopsis Test</Text>
        <View style={styles.inputContainer_two}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handletypestrenr}
            value={typestrenr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Near
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />

          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input_two}
            onChangeText={handletypestredr}
            value={typestredr}
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Distant
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            mode='outlined'
            cursorColor='black'
            outlineStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}
            style={styles.input}
            onChangeText={handleComments}
            value={comments}
            multiline
            label={
              <Text style={{ color: 'black', backgroundColor: 'white' }}>
                Comments
                <Text style={{ color: 'red', backgroundColor: 'white' }}> *</Text>
              </Text>
            }
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(1),
    color: 'white',
  },
  heading: {
    paddingTop: responsiveHeight(2),
    paddingLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(2.6), //Fontsize 20 is 2.6 and Fontsize 16 is 2.1 fontsize 14 is 1.9
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  heading1: {
    color: 'black',
    fontSize: responsiveFontSize(2.8),
    fontFamily: 'Poppins-Regular',
    paddingTop: responsiveHeight(2),
    paddingLeft: responsiveWidth(2),
  },
  inputContainer: {
    backgroundColor: 'white',
  },
  input: {
    margin: responsiveWidth(4),
    backgroundColor: 'white',
    fontSize: responsiveFontSize(2.1),
    fontFamily: 'Poppins-Regular',
  },
  label: {
    position: 'absolute',
    left: responsiveWidth(6.8),
    top: responsiveHeight(2.6),
    paddingHorizontal: responsiveWidth(1),
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(2.1),
    color: 'black',
  },
  floatingLabel: {
    position: 'absolute',
    left: responsiveWidth(2.5),
    top: responsiveHeight(-1.3),
    paddingHorizontal: responsiveWidth(2),
    backgroundColor: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(1.9),
    color: '#175CA4',
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: responsiveHeight(0.15),
    marginTop: responsiveHeight(4),
  },
  dropdownContainer: {
    padding: responsiveHeight(3),
    backgroundColor: 'white',
  },
  dropdownItem: {
    paddingVertical: responsiveHeight(1.5),
    fontSize: responsiveFontSize(2.1),
    color: 'black',
  },
  buttonGroupContainer: {
    height: responsiveHeight(6),
    marginTop: responsiveHeight(1.5),
    borderWidth: responsiveHeight(0.1),
    borderColor: 'black'
  },
  selectedButtonStyle: {
    backgroundColor: '#175CA4',
  },
  innerBorderStyle: {
    borderWidth: responsiveHeight(0.1),
    color: 'black'
  },
  textStyle: {
    color: 'black'
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(1.5),
  },
  switchLabel: {
    marginLeft: responsiveWidth(2.5),
    fontSize: responsiveFontSize(2.1),
    color: 'black',
    flex: 1,
  },
  input_two: {

    fontSize: responsiveFontSize(2.1),
    fontFamily: 'Poppins-Regular',
    marginLeft: responsiveWidth(2.6),
    marginRight: responsiveWidth(2.6),
    borderRadius: responsiveWidth(3.5),
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer_two: {
    marginTop: responsiveWidth(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AssessmentForm;