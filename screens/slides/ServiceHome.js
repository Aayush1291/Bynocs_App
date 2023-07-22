import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, View } from "react-native";


const ServiceHome=({navigation})=>{
    const handleLogout=()=>{
        AsyncStorage.clear();
        navigation.replace('Main')
    }
    return(
        <View>
            <Text>Service home</Text>
            <Text onPress={handleLogout}>log out</Text>
        </View>
    )
}
export default ServiceHome;