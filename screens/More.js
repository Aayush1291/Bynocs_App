import { View, Text } from 'react-native';
import React from 'react';
import Logout from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const More = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Retrieve the 'photo' item from AsyncStorage before clearing all data
      const photoItem = await AsyncStorage.getItem('ProfilePhoto');
      
      // Clear all data from AsyncStorage
      await AsyncStorage.clear();

      // Set the 'photo' item back to AsyncStorage
      if (photoItem) {
        await AsyncStorage.setItem('ProfilePhoto', photoItem);
      }

      // Navigate to the 'Main' screen
      navigation.replace('Main');
    } catch (error) {
      console.error('Error while handling logout:', error);
    }
  };

  return (
    <View style={{ flexDirection: 'row', marginTop: 20 }}>
      <Logout name='logout' size={50} style={{ marginLeft: 10 }} onPress={handleLogout} />
      <Text style={{ fontSize: 35, marginLeft: 50 }} onPress={handleLogout}>Logout</Text>
    </View>
  );
};

export default More;
