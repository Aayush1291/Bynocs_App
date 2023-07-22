import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Button } from 'react-native';

function FirstPage({ navigation }) {
    const handleLogout=()=>{
AsyncStorage.clear()
navigation.replace('Main')
    }
  return (
    <View>
    
      <Button
        title="Visiting Time"
        onPress={() => navigation.replace('SecondPage')}
      />

<Button 
        title="Time off"
        onPress={() => navigation.replace('ThirdPage')}
       
      />
      <Button 
        title="Logout"
        onPress={handleLogout}
       
      />
    </View>
  );
}

export default FirstPage;