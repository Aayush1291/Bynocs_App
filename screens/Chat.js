import React from 'react';
import { View,StyleSheet } from 'react-native';
import { TextInput,Text } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';

const Chat = () => {
  return (
    <View>
      <TextInput
    style={styles.input}
  mode="outlined"
  label={
  <Text>
       Label
       <Text style={{color: 'red'}}> *</Text>
  </Text>
  }
/>  
    </View>
  );
};
const styles = StyleSheet.create({
input: {
  padding: responsiveWidth(4),
  borderColor: 'black',
  borderWidth: responsiveWidth(0.3),
  fontSize: responsiveFontSize(2.1),
  fontFamily: 'Poppins-Regular',
  marginLeft: responsiveWidth(4),
  marginRight: responsiveWidth(4),
  borderRadius: responsiveWidth(3.5),
},
})
export default Chat;