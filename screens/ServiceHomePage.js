import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Home from './homePage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from './Settings';
import Book_Appointment from './Book_Appointment';
import Chat from './Chat';
import { View,TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstPage from './FirstPage';

function ServiceHomePage() {
  const [userRole, setUserRole] = useState(null);
    const Tab = createBottomTabNavigator();

    useEffect(()=>{
      getRole();
    })

    const getRole = async ()=>{
      const role = await AsyncStorage.getItem('role');
      setUserRole(role);
    }

const CustomTabBarButton = ({ iconName, onPress, isFocused }) => (
    <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5, 
    }}
  >
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isFocused ? '#175CA4' : 'transparent',
        borderRadius: 8,
        borderWidth: 5,
        borderColor: 'transparent',
        elevation: isFocused ? 15 : 0,
        shadowColor: '#f83287',
        shadowOpacity: isFocused ? 1 : 0,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 1,
        marginTop: 5,
      }}
      onPress={onPress}
    >
      <Icon name={iconName} size={25} color={isFocused ? 'white' : '#D3D3D3'}/>

    </TouchableOpacity>
  </View>
);
  return (
            <Tab.Navigator
                screenOptions={{
                    showLabel: false, // Hide the label of the active tab
                    style: {
                        borderTopWidth: 0,
                        elevation: 10,
                        
                    },
                    tabStyle: {
                        justifyContent: 'center', 
                    }
                }}
                tabBar={(props) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            height:55, 
                        }}
                    >
                        <CustomTabBarButton
                            onPress={() => props.navigation.navigate('Home')}
                            iconName="home"
                            isFocused={props.state.index === 0}
                        />
                        <CustomTabBarButton
                            onPress={() => props.navigation.navigate('Chat')}
                            iconName="commenting-o"
                            isFocused={props.state.index === 1}
                        />
                        {/* <CustomTabBarButton
                            onPress={() => props.navigation.navigate('Book_Appointment')}
                            iconName="calendar-plus-o"
                            isFocused={props.state.index === 2}
                        /> */}
                        <CustomTabBarButton
                            onPress={() => props.navigation.navigate('Report')}
                            iconName="file-text-o"
                            isFocused={props.state.index === 2}
                        />
                        <CustomTabBarButton
                            onPress={() => props.navigation.navigate('FirstPage')}
                            iconName="ellipsis-h"
                            isFocused={props.state.index === 3}
                        />
                    </View>
                )}
            >
                <Tab.Screen name="Home" component={Home} options={{headerShown:false}}/>
                <Tab.Screen name="Chat" component={Chat} />
                {/* <Tab.Screen name="Book_Appointment" component={Book_Appointment} options={{headerShown:false}} /> */}
                <Tab.Screen name="Report" component={Settings} />
                <Tab.Screen name="FirstPage" component={FirstPage} options={{title: 'More'}}/>
            </Tab.Navigator>
  );
}

export default ServiceHomePage;