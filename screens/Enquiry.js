import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, Modal, Alert, Dimensions } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import styles from '../styles/styles';
import CountryPicker from 'react-native-country-picker-modal';

const Enquiry = () => {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [comments, setComments] = useState('');
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const { height, width } = Dimensions.get('window');

    const genderOptions = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
    ];

    const handleDateSelect = (date) => {
        const selectedDate = date.dateString;
        const [year, month, day] = selectedDate.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        setBirthDate(formattedDate);
        setIsCalendarVisible(false);
    };
    const handleCountrySelect = (country) => {
        setCountry(country.cca2);
        console.log('Selected Country:', country.cca2); // Print cca2 in the console
    };
    const handleSubmission = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || !birthDate || !gender || !contactNumber || !email || !country || !city || !comments) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        const formData = {
            name,
            birthDate,
            gender,
            contactNumber,
            email,
            country,
            city,
            comments,
        };

        // Make API call or perform form submission here
        fetch('https://retoolapi.dev/996BrF/enquiry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    Alert.alert('Success', 'Form submitted successfully');
                    // Reset form after successful submission
                    setName('');
                    setBirthDate('');
                    setGender('')
                    setContactNumber('');
                    setEmail('');
                    setCountry('');
                    setCity('');
                    setComments('');
                } else {
                    Alert.alert('Error', 'An error occurred while submitting the form');
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Error', 'An error occurred while submitting the form');
            });
    };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
        <ScrollView contentContainerStyle={{
            backgroundColor: '#fff',
        }}>
            <Text style={{
                color: '#303535',
                fontFamily: 'Poppins-Regular',
                fontSize: responsiveFontSize(3.5),
                marginLeft: responsiveWidth(3),
                marginTop: responsiveHeight(2.8),
                marginBottom: responsiveHeight(4),
            }}>Enquiry Page</Text>

            <View>
                <Text style={styles.Enquiry_text}>Full Name</Text>
                <TextInput
                    style={styles.Enquiry_textinput_a}
                    //   placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* <View> */}
            <TouchableOpacity style={{}} onPress={() => setIsCalendarVisible(true)}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.Enquiry_text}>Birth Date</Text>
                        <TextInput
                            style={styles.Enquiry_textinput_b}
                            //   placeholder="Birth Date"
                            value={birthDate}
                            editable={false}
                        />
                    </View>
                    <View style={{ top: responsiveHeight(1.6) }}>
                        <Icon name="calendar" size={responsiveFontSize(3.5)} color="#175CA4" style={{ marginLeft: responsiveWidth(0.25) }} />
                    </View>
                </View>
            </TouchableOpacity>

            <Text style={styles.Enquiry_text}>Gender</Text>

            <RadioForm formHorizontal style={{}}>
                {genderOptions.map((option, index) => (
                    <View key={index} style={{ marginTop: responsiveHeight(1) }}>
                        <RadioButton labelHorizontal>
                            <RadioButtonInput
                                obj={option}
                                index={index}
                                isSelected={gender === option.value}
                                onPress={() => setGender(option.value)}
                                borderWidth={1}
                                buttonInnerColor="#175CA4"
                                buttonOuterColor="#175CA4"
                                buttonSize={8}
                                buttonOuterSize={15}
                                buttonStyle={{}}
                                buttonWrapStyle={{ marginLeft: responsiveWidth(5), marginRight: responsiveWidth(1), top: responsiveHeight(0.4) }}
                            />

                            <RadioButtonLabel
                                obj={option}
                                index={index}
                                labelHorizontal
                                onPress={() => setGender(option.value)}
                                labelStyle={{ color: 'black' }}
                                labelWrapStyle={{ marginRight: responsiveWidth(2) }}
                            />
                        </RadioButton>
                    </View>
                ))}
            </RadioForm>

            <Text style={styles.Enquiry_text_Contact}>Contact</Text>

            <View style={{ top: responsiveHeight(2.3) }}>
                <Text style={styles.Enquiry_text_afterContact}>Phone Number</Text>
                <TextInput
                    style={styles.Enquiry_textinput_afterContact}
                    // maxLength={10}
                    //   placeholder="Enter your contact number"
                    value={contactNumber}
                    onChangeText={setContactNumber}
                    keyboardType="numeric"
                    maxLength={10}
                />
            </View>

            <View style={{ top: responsiveHeight(2.3) }}>
                <Text style={styles.Enquiry_text_afterContact}>Email</Text>
                <TextInput
                    style={styles.Enquiry_textinput_afterContact}
                    //   placeholder="Enter your contact number"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            <View style={{ top: responsiveHeight(2.3) }}>
                <Text style={styles.Enquiry_text_afterContact}>Country</Text>
                <TextInput style={styles.Enquiry_textinput_afterContact} editable={false}/>
                <View style={{marginLeft:responsiveWidth(5)}}>
                <CountryPicker
        withFilter
        withFlag
        withCountryNameButton
        withAlphaFilter
        //withCallingCode
        withEmoji
        countryCode={country}
        onSelect={(country) => setCountry(country.cca2)}
        visible={false}
        withFlagButton={false}
    />
    </View>
            </View>
            <View style={{ top: responsiveHeight(2.3) }}>
                <Text style={styles.Enquiry_text_afterContact}>City</Text>
                <TextInput
                    style={styles.Enquiry_textinput_afterContact}
                    //   placeholder="Enter your contact number"
                    value={city}
                    onChangeText={setCity}
                />
            </View>

            <View style={{ top: responsiveHeight(2.3) }}>
                <Text style={styles.Enquiry_text_afterContact}>Comments</Text>
                <TextInput
                    style={styles.Enquiry_textinput_afterContact}
                    //   placeholder="Enter your contact number"
                    multiline
                    // numberOfLines={4}
                    value={comments}
                    onChangeText={setComments}
                />
            </View>
            <View style={{ paddingLeft: responsiveWidth(5), paddingRight: responsiveWidth(5) }}>
                <TouchableOpacity style={styles.Submit_Button} onPress={handleSubmission}>
                    <Text style={styles.Submit_Button_Text}>Submit</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={isCalendarVisible} animationType="slide">
                <View style={styles.Calendar_Container}>
                    <View style={styles.Calendar_Header}>
                        <Text style={styles.Calendar_Header_Text}>Select Date</Text>
                        <TouchableOpacity onPress={() => setIsCalendarVisible(false)}>
                            <Icon name="close" size={24} color="white" style={styles.CloseIcon} />
                        </TouchableOpacity>
                    </View>
                    <Calendar onDayPress={handleDateSelect} maxDate={today}/>
                </View>
            </Modal>
        </ScrollView >
    );
};

export default Enquiry;