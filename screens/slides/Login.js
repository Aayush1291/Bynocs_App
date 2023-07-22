import React, { useState, useEffect } from 'react';
import {View,Text,ActivityIndicator,TextInput,TouchableOpacity,Alert,} from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import bcrypt from 'react-native-bcrypt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginErrors from '../../helper/LoginErrors';
import NetInfo from '@react-native-community/netinfo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import styles from '../../styles/styles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = async () => {
    setIsLoading(true);
    const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
    if (!isConnected) {
      setErrorMessage(LoginErrors.NETWORK_ERROR);
      setIsLoading(false);
    }
    else if (!email && !password) {
      setEmailError(true);
      setPasswordError(true);
      setErrorMessage(LoginErrors.MISSING_FIELDS);
      setIsLoading(false);
    }
    else if (!email || !password) {
      if (!email) {
        setEmailError(true);
        setErrorMessage(LoginErrors.INVALID_EMAIL);
        setIsLoading(false);

      }
      else if (!password) {
        setPasswordError(true);
        setErrorMessage(LoginErrors.INVALID_PASSWORD);
        setIsLoading(false);

      }
    }
    else {
      await handleLogin();

    }
  }


  const handleLogin = async () => {
    try {
      
      const response = await fetch('https://www.myjsons.com/v/1ee31319');
      const jsonData = await response.json();

      const user = await jsonData.check.find(u => u.email === email);

      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          await AsyncStorage.setItem('loggedIn', 'true');
          await AsyncStorage.setItem('UserName', user.username);
          await AsyncStorage.setItem('Email', email);
          await AsyncStorage.setItem('role',user.role)
          console.log(user.username);
          console.log(user.role);
          setTimeout(() => {
            setIsLoading(false);
            if(user.role!=1)
            navigation.replace('BottomNavTabs');
            else
            navigation.replace('FirstPage')
          }, 1000);
        } else {
          Alert.alert('Error', 'Invalid password!');

        }

      } else {
        Alert.alert('Error', 'Invalid email or password!');
      }

    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('loggedIn');
      const role = await AsyncStorage.getItem('role');
  
      if (isLoggedIn === 'true' && role === '1') {
        navigation.replace('ServiceHome');
      } else if (isLoggedIn === 'true') {
        navigation.replace('BottomNavTabs');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <View>
      <View>
        <Text style={{
          color: '#303535',
          fontFamily: 'Poppins-Regular',
          fontSize: responsiveFontSize(2.5),
          marginLeft: responsiveWidth(4.5),
          marginTop: responsiveHeight(7),
        }}> Login Now to Start</Text>
      </View>
      <Text style={styles.Login_Parameter_Text}>Your Email</Text>
      <View
        style={[styles.Login_Email_View, {borderColor: emailError ? 'red' : '#175CA4'}]}>
        <MaterialIcons
          name="account-circle"
          style={{ color: 'black' }}
          size={responsiveHeight(4)}
        />

        <TextInput
          maxLength={25}
          style={styles.Login_TextInput}
          onChangeText={text => {
            setEmail(text);
            setEmailError(false);
          }}
          value={email}
          placeholder="youremail@gmail.com"
          placeholderTextColor="#808080"
        />
        <Octicons
          name={email ? 'check' : ''}
          style={{ color: '#175CA4', marginRight: responsiveWidth(5) }}
          size={24}
        />
      </View>
      <Text style={styles.Login_Parameter_Text}>Password</Text>
      <View
        style={[styles.Login_Password_View, {borderColor: passwordError ? 'red' : '#175CA4',}]}>
        <MaterialIcons name="lock" style={{ color: 'black' }} size={24} />

        <TextInput
          maxLength={25}
          style={styles.Login_TextInput}
          onChangeText={text => {
            setPassword(text);
            setPasswordError(false);
          }}
          secureTextEntry={!showPassword}
          value={password}
          placeholder="Enter Password"
          placeholderTextColor="#808080"
        />
        <Octicons
          name={showPassword ? 'eye' : 'eye-closed'}
          style={{ color: '#175CA4', marginRight: responsiveWidth(5) }}
          size={24}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>

      <TouchableOpacity>
        <View>
          <Text style={styles.Recovery_Password}>Recovery Password?</Text>
        </View>
      </TouchableOpacity>
      {errorMessage ? (
        <Text style={styles.Error_Message}>{errorMessage}</Text>
      ) : null}

      <View style={styles.Sign_in_button_view}>
        <TouchableOpacity onPress={validate}>
          <View
            style={styles.Sign_in_button}>
            {!isLoading ? (
              <Text style={styles.Sign_in_button_Text}>Sign in</Text>
          ) : (
          <ActivityIndicator size={23} color="white" />
          )}
      </View>
    </TouchableOpacity>
    </View >
    </View >
  )
};
export default Login;