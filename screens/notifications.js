import {
 
  Image,
 
  Text,
 
  View,
 
  TouchableOpacity,
 
  BackHandler,
 
  Alert,
 
  ScrollView,
 
} from 'react-native';
 
import {useEffect, useState} from 'react';
 
import Icon from 'react-native-vector-icons/Ionicons';
 
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import {
 
  responsiveFontSize,
 
  responsiveHeight,
 
  responsiveWidth,
 
} from 'react-native-responsive-dimensions';
 
import Activity from 'react-native-vector-icons/MaterialCommunityIcons';
 
import Back from 'react-native-vector-icons/MaterialIcons';
 
const Notifications = ({navigation}) => {
 
  const [appointments, setAppointments] = useState([]);
 
  const [userName, setUserName] = useState('');
 
  const[role,setRole]=useState('')
 
 
 
  useEffect(() => {
 
    retrieveUserName();
 
    retrieveRole();
 
    fetchAppointments();
 
  }, []);
 

  function formatDate (dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
 
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
 
  const retrieveRole = async () => {
 
    try {
 
      const storedRole = await AsyncStorage.getItem('role');
 
      console.log(storedRole);
 
      if (storedRole) {
 
        setRole(storedRole);
 
      }
 
    } catch (error) {
 
      console.error('Error retrieving role from AsyncStorage:', error);
 
    }
 
  };
 
  const fetchAppointments = async () => {
 
    try {
 
      const response = await fetch(`https://retoolapi.dev/Xim6Z4/data`);
 
      const jsonData = await response.json();
 
      setAppointments(jsonData);
 
      console.log(jsonData);
 
    } catch (error) {
 
      console.error('Error fetching appointments:', error);
 
    }
 
  };
 
 
 
  return (
 
    <ScrollView>
 
      <View>
 
        {/* Render the appointments list */}
 
 
        {/* {appointments && appointments.length > 0 ? ( */}
 
          {appointments.map((appointment, index) => {
 
            return (
 
              <View key={index}>
 
                {appointment.username === userName && (role==2 || role==3) ? (
 
                  <View
 
                    style={{
 
                      marginTop: 20,
 
                      marginHorizontal: 20,
 
                      borderWidth: 0.5,
 
                      borderRadius: 8,
 
                      borderColor: '#175CA4',
 
                      backgroundColor: 'white',
 
                      // shadowColor: '#171717',
 
                      // shadowOffset: {width: -2, height: 4},
 
                      // shadowOpacity: 0.2,
 
                      // shadowRadius: 3,
 
                      // elevation: 16,
 
                    }}>
 
                    <View style={{marginHorizontal: 20, marginVertical: 10}}>
 
                      <Text
 
                        style={{
 
                          color: '#175CA4',
 
                          fontFamily: 'Poppins-Regular',
 
                        }}>
 
                        {/* Date: {formatDate(appointment.date)} */}
 
                        You have successfully booked an appointment with {appointment.serviceName} at {formatDate(appointment.date)} from {appointment.startTime}-{appointment.endTime}
 
                      </Text>
 
                      {/* <Text
 
                        style={{
 
                          color: '#175CA4',
 
                          fontFamily: 'Poppins-Regular',
 
                        }}>
 
                        Time: {appointment.startTime} - {appointment.endTime}
 
                      </Text>
 
                      <Text
 
                        style={{
 
                          color: '#175CA4',
 
                          fontFamily: 'Poppins-Regular',
 
                        }}>
 
                        Category: {appointment.category}
 
                      </Text>
 
                      <Text
 
                        style={{
 
                          color: '#175CA4',
 
                          fontFamily: 'Poppins-Regular',
 
                        }}>
 
                        Appointment with: {appointment.serviceName}
 
                      </Text> */}
 
                    </View>
 
                  </View>
 
                ) : null}
 
                {appointment.serviceName===userName?(
 
                  <View
 
                  key={index}
 
                  style={{
 
                    marginTop: 20,
 
                    marginHorizontal: 20,
 
                    borderWidth: 0.5,
 
                    borderRadius: 8,
 
                    borderColor: '#175CA4',
 
                    backgroundColor: 'white',
 
                  }}>
 
                    <View style={{marginHorizontal: 20, marginVertical: 10}}>
 
                      <Text
 
                      style={{
 
                        color: '#175CA4',
 
                        fontFamily: 'Poppins-Regular',
 
                      }}
 
                      >{appointment.username} has booked an appointment with you, at {formatDate(appointment.date)}, from {appointment.startTime} - {appointment.endTime}. </Text>
 
                    </View>
 
                  {/* <View style={{marginHorizontal: 20, marginVertical: 10}}>
 
                    <Text
 
                      style={{
 
                        color: '#175CA4',
 
                        fontFamily: 'Poppins-Regular',
 
                      }}>
 
                      Date: {appointment.date}
 
                    </Text>
 
                    <Text
 
                      style={{
 
                        color: '#175CA4',
 
                        fontFamily: 'Poppins-Regular',
 
                      }}>
 
                      Time: {appointment.startTime} - {appointment.endTime}
 
                    </Text>
 
                    <Text
 
                      style={{
 
                        color: '#175CA4',
 
                        fontFamily: 'Poppins-Regular',
 
                      }}>
 
                      Category: {appointment.category}
 
                    </Text>
 
                    <Text
 
                      style={{
 
                        color: '#175CA4',
 
                        fontFamily: 'Poppins-Regular',
 
                      }}>
 
                      Appointment with: {appointment.username}
 
                    </Text>
 
                  </View> */}
 
                </View>
 
                ):(
 
                  null
 
                )}
 
              </View>
 
            );
 
          })}
 
      </View>
 
    </ScrollView>
 
  );
 
};
 
export default Notifications;