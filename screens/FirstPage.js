import AsyncStorage from '@react-native-async-storage/async-storage';
 
import React from 'react';
 
import {View, Button, Text} from 'react-native';
 
import Logout from 'react-native-vector-icons/MaterialIcons';
 
import User from 'react-native-vector-icons/Feather';
 
 
function FirstPage({navigation}) {
 
  const handleLogout = () => {
 
    AsyncStorage.clear();
 
    navigation.replace('Main');
 
  };
 
  return (
 
    <View style={{marginHorizontal: 20}}>
 
      <View style={{flexDirection: 'row', marginTop: 20}}>
 
        <User
 
          name="user"
 
          size={50}
 
          style={{marginLeft: 10}}
 
          onPress={() => navigation.navigate('SecondPage')}
 
        />
 
        <Text style={{fontSize: 35, marginLeft: 40, color: 'black'}}>
 
          Visiting Time
 
        </Text>
 
      </View>
 
 
      <View style={{flexDirection: 'row', marginTop: 20}}>
 
        <User
 
          name="user"
 
          size={50}
 
          style={{marginLeft: 10}}
 
          onPress={() => navigation.navigate('ThirdPage')}
 
        />
 
        <Text style={{fontSize: 35, marginLeft: 40, color: 'black'}}>
 
          Time Off
 
        </Text>
 
      </View>
 
      <View style={{flexDirection: 'row', marginTop: 20}}>
 
        <Logout
 
          name="logout"
 
          size={50}
 
          style={{marginLeft: 10}}
 
          onPress={handleLogout}
 
        />
 
        <Text
 
          style={{fontSize: 35, marginLeft: 50, color: 'black'}}
 
          onPress={handleLogout}>
 
          Logout
 
        </Text>
 
      </View>
 
    </View>
 
  );
 
}
 
 
export default FirstPage;