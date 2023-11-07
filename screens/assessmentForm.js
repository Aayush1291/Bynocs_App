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
  const [sphr,setSPHr]=useState('');
  const [sphl,setSPHl]=useState('');
  const [cylr,setCYLr]=useState('');
  const [cyll,setCYLl]=useState('');
  const [axisr,setAxisr]=useState('');
  const [axisl,setAxisl]=useState('');

  const [srsphr,srsetSPHr]=useState('');
  const [srsphl,srsetSPHl]=useState('');
  const [srcylr,srsetCYLr]=useState('');
  const [srcyll,srsetCYLl]=useState('');
  const [sraxisr,srsetAxisr]=useState('');
  const [sraxisl,srsetAxisl]=useState('');
  const [bcva, setBcva] = useState(-1);
  const[bcvar,setBcvar]=useState("");
  const[bcval,setBcval]=useState("");
  const[bcvaipd,setBcvaIpd]=useState("");
const[prismr,setPrismr]=useState("");
const[prisml,setPrisml]=useState("");
const[baser,setBaser]=useState("");
const[basel,setBasel]=useState("");
const[interl,setInterl]=useState("");
const[interr,setInterr]=useState("");
const[nearr,setNearr]=useState("");
const[nearl,setNearl]=useState("");
const[anterl,setAnterl]=useState("");
const[anterr,setAnterr]=useState("");
const[pnterl,setPnterl]=useState("");
const[pnterr,setPnterr]=useState("");
const[covernr,setcovernr]=useState("");
const[coverdr,setcoverdr]=useState("");
const[strenr,setstrenr]=useState("");
const[streerdr,setstredr]=useState("");
const[typestrenr,settypestrenr]=useState("");
const[typestredr,settypestredr]=useState("");
const[comments,setComments]=useState("")
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
const od = [
  {key:'1', value:'Foveal'},
  {key:'2', value:'Eccentric'},
  {key:'3', value:'Cancel'},
]
const os = [
  {key:'1', value:'Foveal'},
  {key:'2', value:'Eccentric'},
  {key:'3', value:'Cancel'},
]
const genderButtons = ['Male', 'Female', 'Other'];
const obejctiveRefraction=['Cyclopegic','Non-Cycloplegic']
const Bcva=['LogMAR','Decimal','Snellens (feet)','Snellens (meters)']
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
  const handleBaserl= (text) => {
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
  const handlenearl= (text) => {
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
              <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handleSphChanger}
          value={sphr}
        />
        <Text style={sphr ? styles.floatingLabel : styles.label}>OD (Right Eye) <Text style={{color:'red'}}>*</Text></Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handleSphChangel}
          value={sphl}
        />
        <Text style={sphl ? styles.floatingLabel_two : styles.label_two}>OS (Left Eye) <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <Text>CYL</Text>
      <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handleCylChanger}
          value={cylr}
        />
        <Text style={cylr ? styles.floatingLabel : styles.label}>OD (Right Eye) <Text style={{color:'red'}}>*</Text></Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handleCylChangel}
          value={cyll}
        />
        <Text style={cyll ? styles.floatingLabel_two : styles.label_two}>OS (Left Eye) <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <Text>AXIS</Text>
      <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handleAxisChanger}
          value={axisr}
        />
        <Text style={axisr ? styles.floatingLabel : styles.label}>OD (Right Eye) <Text style={{color:'red'}}>*</Text></Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handleAxisChangel}
          value={axisl}
        />
        <Text style={axisl ? styles.floatingLabel_two : styles.label_two}>OS (Left Eye) <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <View style={styles.horizontalLine} />
      <Text style={{fontWeight:'bold'}}>Subjective Refraction <Text style={{color:'red'}}>*</Text></Text>
      <Text>SPH</Text>
              <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handleSrSphChanger}
          value={srsphr}
        />
        <Text style={srsphr ? styles.floatingLabel : styles.label}>OD (Right Eye) <Text style={{color:'red'}}>*</Text></Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handleSrSphChangel}
          value={srsphl}
        />
        <Text style={srsphl ? styles.floatingLabel_two : styles.label_two}>OS (Left Eye) <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <Text>CYL</Text>
      <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handleSrCylChanger}
          value={srcylr}
        />
        <Text style={srcylr ? styles.floatingLabel : styles.label}>OD (Right Eye) <Text style={{color:'red'}}>*</Text></Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handleSrCylChangel}
          value={srcyll}
        />
        <Text style={srcyll ? styles.floatingLabel_two : styles.label_two}>OS (Left Eye) <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <Text>AXIS</Text>
      <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handleSrAxisChanger}
          value={sraxisr}
        />
        <Text style={sraxisr ? styles.floatingLabel : styles.label}>OD (Right Eye) <Text style={{color:'red'}}>*</Text></Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handleSrAxisChangel}
          value={sraxisl}
        />
        <Text style={sraxisl ? styles.floatingLabel_two : styles.label_two}>OS (Left Eye) <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <View style={styles.horizontalLine} />
      <Text>BCVA Unit<Text style={{color: 'red'}}>*</Text></Text>
        <ButtonGroup
          buttons={Bcva}
          selectedIndex={bcva}
          onPress={(selectedIndex) => setBcva(selectedIndex)}
          containerStyle={styles.genderContainer}
        />
              <View style={styles.horizontalLine} />

              <Text style={{fontWeight:'bold'}}>Visual Acuity <Text style={{color:'red'}}>*</Text></Text>
      <Text>BCVA</Text>
              <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handleBcvar}
          value={bcvar}
        />
        <Text style={bcvar ? styles.floatingLabel : styles.label}>OD (Right Eye) <Text style={{color:'red'}}>*</Text></Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handleBcval}
          value={bcval}
        />
        <Text style={bcval ? styles.floatingLabel_two : styles.label_two}>OS (Left Eye) <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleBcvaipd}
          value={bcvaipd}
        />
        <Text style={bcvaipd ? styles.floatingLabel : styles.label}>Interpupillary Distance (IPD in mm) <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <View style={styles.horizontalLine} />
      {/* ye niche wala thik karna hai*/}
      <View style={styles.inputContainer_two}>
          <TextInput
            style={styles.input_two}
            value={patientType}
            onFocus={toggleDropdown}
          />

          <Text style={patientType ? styles.floatingLabel : styles.label}>
          OD (Right Eye) <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <TextInput
            style={styles.input_two}
            value={patientType}
            onFocus={toggleDropdown}
          />
          <Text style={patientType ? styles.floatingLabel_two : styles.label_two}>
            OS (Left Eye) <Text style={{ color: 'red' }}>*</Text>
          </Text>
        </View>

        <BottomSheet
          isVisible={isBottomSheetVisible}
          onBackdropPress={() => setIsBottomSheetVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            {od.map(item => (
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
        <BottomSheet
          isVisible={isBottomSheetVisible}
          onBackdropPress={() => setIsBottomSheetVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            {os.map(item => (
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
      {/* yah tak*/}
      <View style={styles.horizontalLine} />
      <Text style={{fontWeight:'bold'}}>Additional Refractive Parameters</Text>
      <Text>Prism</Text>
              <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handlePrismr}
          value={prismr}
        />
        <Text style={prismr ? styles.floatingLabel : styles.label}>OD (Right Eye)</Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handlePrisml}
          value={prisml}
        />
        <Text style={prisml ? styles.floatingLabel_two : styles.label_two}>OS (Left Eye)</Text>
      </View>
      
      <Text>Base</Text>
              <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handleBaser}
          value={baser}
        />
        <Text style={baser ? styles.floatingLabel : styles.label}>OD (Right Eye) <Text style={{color:'red'}}>*</Text></Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handleBaserl}
          value={basel}
        />
        <Text style={basel ? styles.floatingLabel_two : styles.label_two}>OS (Left Eye)</Text>
      </View>

      <Text>Intermediate Add</Text>
              <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handleinterr}
          value={interr}
        />
        <Text style={interr ? styles.floatingLabel : styles.label}>OD (Right Eye)</Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handleinterl}
          value={interl}
        />
        <Text style={interl ? styles.floatingLabel_two : styles.label_two}>OS (Left Eye) </Text>
      </View>
      <Text>Near Add</Text>
              <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handlenearr}
          value={nearr}
        />
        <Text style={nearr ? styles.floatingLabel : styles.label}>OD (Right Eye)</Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handlenearl}
          value={nearl}
        />
        <Text style={nearl ? styles.floatingLabel_two : styles.label_two}>OS (Left Eye)</Text>
      </View>

      <View style={styles.horizontalLine} />
      <Text style={{fontWeight:'bold'}}>Clinical Findings (Specify any ocular pathology)</Text>
      <Text>Anterior Segment</Text>
              <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handleanterr}
          value={anterr}
        />
        <Text style={anterr ? styles.floatingLabel : styles.label}>OD (Right Eye)</Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handleanterl}
          value={anterl}
        />
        <Text style={anterl ? styles.floatingLabel_two : styles.label_two}>OS (Left Eye)</Text>
      </View>
      
      <Text>Posterior Segment</Text>
              <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handlepnterr}
          value={pnterr}
        />
        <Text style={pnterr ? styles.floatingLabel : styles.label}>OD (Right Eye) </Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handlepnterl}
          value={pnterl}
        />
        <Text style={pnterl ? styles.floatingLabel_two : styles.label_two}>OS (Left Eye)</Text>
      </View>

      <View style={styles.horizontalLine} />
      <Text style={{fontWeight:'bold'}}>Sensory and Motor Findings <Text style={{color:'red'}}>*</Text></Text>
      <Text>Cover Test (Prism Dioptre)</Text>
              <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handlecovernr}
          value={covernr}
        />
        <Text style={covernr ? styles.floatingLabel : styles.label}>Near <Text style={{color:'red'}}>*</Text></Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handlecoverdr}
          value={coverdr}
        />
        <Text style={coverdr ? styles.floatingLabel_two : styles.label_two}>Distant <Text style={{color:'red'}}>*</Text></Text>
      </View>
      
      <Text>Stereopsis(Seconds or Arc)</Text>
              <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handlestrenr}
          value={strenr}
        />
        <Text style={strenr ? styles.floatingLabel : styles.label}>Near <Text style={{color:'red'}}>*</Text></Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handlestredr}
          value={streerdr}
        />
        <Text style={streerdr ? styles.floatingLabel_two : styles.label_two}>Distant <Text style={{color:'red'}}>*</Text></Text>
      </View>

      <Text> Type Stereopsis Test</Text>
              <View style={styles.inputContainer_two}>
        <TextInput
          style={styles.input_two}
          onChangeText={handletypestrenr}
          value={typestrenr}
        />
        <Text style={typestrenr ? styles.floatingLabel : styles.label}>Near <Text style={{color:'red'}}>*</Text></Text>

        <TextInput
          style={styles.input_two}
          onChangeText={handletypestredr}
          value={typestredr}
        />
        <Text style={typestredr ? styles.floatingLabel_two : styles.label_two}>Distant <Text style={{color:'red'}}>*</Text></Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleComments}
          value={comments}
        />
        <Text style={ comments? styles.floatingLabel : styles.label}>Comments</Text>
      </View>
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
  input_two: {
    padding: 15,
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginLeft:10,
    marginRight:10,
    borderRadius:10,
    flex:1
  },
  inputContainer_two: {
    marginTop:responsiveWidth(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label_two: {
    position: 'absolute',
    left: 215,
    top: 20,
    paddingHorizontal: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'black',
  },
  floatingLabel_two: {
    position: 'absolute',
    left: 190,
    top: -8,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'blue',
  },
});

export default AssessmentForm;
