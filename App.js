import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Main from './screens/Main';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/slides/Login';
import Enquiry from './screens/Enquiry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavTabs from './screens/bottomNavigation';
import Notifications from './screens/notifications';
import Activity1 from './screens/Activity1';
import Activity3 from './screens/Activity3';
import Profile from './screens/profile';
import Modal from 'react-native-modal';
import FirstPage from './screens/FirstPage';
import SecondPage from './screens/SecondPage';
import AddPage from './screens/AddPage';
import ThirdPage from './screens/timeoff';
import AddPage2 from './screens/AddPage2';
import Activity2 from './screens/Activity2';
import ServiceHomePage from './screens/ServiceHomePage';
const stack = createNativeStackNavigator();
import EligibilityCheck from './screens/eligibilityCheck';
import AssessmentForm from './screens/assessmentForm';
const App = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isAddPageVisible, setAddPageVisible] = useState(false);
  const [isAddPageVisibleThird, setAddPageVisibleThird] = useState(false);
  useEffect(() => {
    fetchData();
    checkLoginStatus();
  }, []);

  const handleAddPress = () => {
    setAddPageVisible(true);
  };

  const handleCloseAddPage = navigation => {
    setAddPageVisible(false);
    // navigation.current && navigation.current.navigate('SecondPage');
  };

  const handleAddPressThird = () => {
    setAddPageVisibleThird(true);
  };

  const handleCloseAddPageThird = () => {
    setAddPageVisibleThird(false);
    // navigation.current && navigation.current.navigate('ThirdPage');
  };
  const checkLoginStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('loggedIn');
      const role = await AsyncStorage.getItem('role');
      if (status === 'true') {
        setIsLoggedIn(true);
        setUserRole(role);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };
  const fetchData = async () => {
    try {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const MainEntry = ({navigation}) => {
    return (
      <View style={{flex: 1}}>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#175CA4" />
          </View>
        ) : (
          <Main navigation={navigation} />
        )}
      </View>
    );
  };

  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Group>
          {isLoggedIn && userRole === '1' ? 
            <stack.Screen
            component={ServiceHomePage}
            name="ServiceHome"
            options={{ headerShown: false }}
          />
          // null 
          : (
            null
          )}
          {isLoggedIn 
          && (userRole === '2' || userRole === '3') 
          ? (
            <stack.Screen
              component={BottomNavTabs}
              name="Home"
              options={{headerShown: false}}
            />
          ) : null}
          {!isLoggedIn || !userRole ? (
            <stack.Screen
              component={MainEntry}
              name="MainEntry"
              options={{headerShown: false}}
            />
          ) : null}
          <stack.Screen
            component={Login}
            name="Login"
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#175ca4'},
              headerTintColor: 'white',
            }}
          />
          <stack.Screen
            component={Enquiry}
            name="Enquiry"
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#175ca4'},
              headerTintColor: 'white',
            }}
          />
          <stack.Screen
            component={Notifications}
            name="Notifications"
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#175ca4'},
              headerTintColor: 'white',
            }}
          />
          <stack.Screen
            component={Activity1}
            name="Activity 1"
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#175ca4'},
              headerTintColor: 'white',
            }}
          />
          <stack.Screen
            component={Activity2}
            name="Activity 2"
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#175ca4'},
              headerTintColor: 'white',
            }}
          />
          <stack.Screen
            component={Activity3}
            name="Activity 3"
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#175ca4'},
              headerTintColor: 'white',
            }}
          />
          <stack.Screen
            component={Profile}
            name="My Profile"
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: '#175ca4'},
              headerTintColor: 'white',
            }}
          />
          <stack.Screen
            component={MainEntry}
            name="Main"
            options={{
              headerShown: false,
            }}
          />
          <stack.Screen
            component={BottomNavTabs}
            name="BottomNavTabs"
            options={{headerShown: false}}
          />
          <stack.Screen
            component={ServiceHomePage}
            name="ServiceHomePage"
            options={{ headerShown: false }}
          />
          <stack.Screen
            component={FirstPage}
            name="FirstPage"
            options={{headerShown: false}}
          />
          <stack.Screen
            name="SecondPage"
            component={SecondPage}
            options={{
              headerShown:true,
              title: 'Visiting Time Slot',
              headerRight: () => (
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={handleAddPress}>
                  <Text style={{color: 'black'}}>ADD</Text>
                </TouchableOpacity>
              ),
            }}
          />
<stack.Screen
  name="EligibilityCheck"
  component={EligibilityCheck}
  options={({ navigation }) => ({
    headerStyle: { backgroundColor: '#175ca4' },
    headerTintColor: 'white',
    headerShown: true,
    title: 'Eligibility Check',
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => navigation.navigate("AssessmentForm")}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>ADD</Text>
      </TouchableOpacity>
    ),
  })}
/>
           <stack.Screen  
                    name="AssessmentForm"
                    
                    component={AssessmentForm}
                    
                    options={{
                      headerStyle: {backgroundColor: '#175ca4'},
                      headerTintColor: 'white',
                      headerShown:true,
                      title: 'Clinical Assessment Record',
                    }}/>
    {/*<stack.Screen
            name="ThirdPage"
            component={ThirdPage}
            options={{
              headerShown:true,
              title: 'Time off',
              headerRight: () => (
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={handleAddPressThird}>
                  <Text style={{color: 'black'}}>ADD</Text>
                </TouchableOpacity>
              ),
            }}
          />*/}
          
        </stack.Group>
      </stack.Navigator>
      <Modal
        isVisible={isAddPageVisible}
        backdropOpacity={0.5}
        onBackdropPress={handleCloseAddPage}
        style={styles.bottomSheet}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Add</Text>
          <AddPage handleCloseAddPage={handleCloseAddPage} />
        </View>
      </Modal>

      <Modal
        isVisible={isAddPageVisibleThird}
        backdropOpacity={0.5}
        onBackdropPress={handleCloseAddPageThird}
        style={styles.bottomSheet}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Add</Text>

          <AddPage2 handleCloseAddPageThird={handleCloseAddPageThird} />
        </View>
      </Modal>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  bottomSheet: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    height: '76%',
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
export default App;
