import { View } from 'react-native';
import React, { useState } from 'react';
import { FloatingLabelInput } from 'react-native-floating-label-input';

const Chat = () => {
  const [firstName, setFirstName] = useState('');
  return (
    <View>
      <FloatingLabelInput
        label="First Name *i want "
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        customShowLabelStyles={{ color: 'blue' }}
        customErrorLabelStyles={{ color: 'blue' }}
        customLabelStyles={{ color: 'red' }}
   />
    </View>
  );
};

export default Chat;
