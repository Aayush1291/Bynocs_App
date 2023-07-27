import React, {useEffect, useState} from 'react';
 
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, RefreshControl, Alert, ScrollView} from 'react-native';
 
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
 
const { height, width } = Dimensions.get('window');
 
 
 
const SecondPage = ({navigation}) => {
 
  const [data, setData] = useState([]);
 
  const [loading, setLoading] = useState(true);
 
  const [error, setError] = useState(null);
 
  const [isDeleteDisabled, setDeleteDisabled] = useState(false);
 
  const [isRefreshing, setIsRefreshing] = useState(false);
 
  const url = 'https://retoolapi.dev/D3HKGH/data';

  const onRefresh = async () => {
    try {
      setIsRefreshing(true);
      // Fetch new data or update data here
      await fetchData();
      setIsRefreshing(false);
    } catch (error) {
      setIsRefreshing(false);
      Alert.alert('Error refreshing data:', error);
    }
  };
 
 
  const fetchData = async () => {
 
    try {
 
      const response = await fetch(url);
 
      const jsonData = await response.json();
 
      setData(jsonData);
 
 
      setDeleteDisabled(jsonData.length === 1);
 
    } catch (error) {
 
      console.error(error);
 
      setError('Failed to fetch data.');
 
    } finally {
 
      setLoading(false);
 
    }
 
  };
 
 
  useEffect(() => {
 
    fetchData();
 
  }, []);
 
 
  const dele = async id => {
 
    const url = 'https://retoolapi.dev/D3HKGH/data';
 
    try {
 
      let result = await fetch(`${url}/${id}`, {
 
        method: 'delete',
 
      });
 
      if (!result.ok) {
 
        throw new Error('Error!');
 
      }
 
      result = await result.json();
 
      if (result) {
 
        console.log('time slot deleted!');
 
        fetchData();
 
      }
 
    } catch (error) {
 
      console.error(error);
 
      setError('Failed to delete time slot!');
 
    }
 
  };
 
 
  return (
    <ScrollView
    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
    <View style={styles.container}>
 
      {error ? (
 
        <Text style={{color: 'red', fontSize: 16}}>{error}</Text>
 
      ) : loading ? (
 
        <Text style={{color: 'black'}}>Loading....</Text>
 
      ) : (
 
        data.map((time, index) => (
 
          <View key={time.id} style={styles.rowContainer}>
 
            <View style={[styles.column, {flex: 1.2}]}>
 
              <Text style={{color: 'black'}}>{time.selectedWeekday}</Text>
 
            </View>
 
            <View style={styles.column}>
 
              <Text style={{color: 'black'}}>{time.fromTime}</Text>
 
            </View>
 
            <View style={styles.column}>
 
              <Text style={{color: 'black'}}>{time.toTime}</Text>
 
            </View>
 
            <View style={[styles.column, {flex: 0.3}]}>
 
              <TouchableOpacity
 
                onPress={() => dele(time.id)}
 
                disabled={isDeleteDisabled && index === 0}>
 
                <Image
 
                  source={require('../assets/delete.png')}
 
                  style={{
 
                    height: 24,
 
                    width: 24,
 
                    opacity: isDeleteDisabled && index === 0 ? 0.5 : 1,
 
                  }}
 
                />
 
              </TouchableOpacity>
 
            </View>
 
          </View>
 
        ))
 
      )}
 
        {/* <View
 
          style={{
 
            height:responsiveHeight(5),
 
            width: responsiveWidth(25),
 
            borderRadius:10,
 
            justifyContent:'center',
 
            alignItems:'center',
 
            position:'fixed',
 
            marginLeft: responsiveWidth(70),
 
            // borderWidth:1,
 
            // borderColor:'',
 
            backgroundColor:'#175CA4',
 
          }}>
 
          <TouchableOpacity onPress={()=> navigation.replace('ServiceHomePage')}>
 
            <Text style={{fontSize:20, color:'white'}}>Go Back</Text>
 
          </TouchableOpacity>
 
        </View> */}
 
      </View>
      </ScrollView>
  );
 
};
 
 
const styles = StyleSheet.create({
 
  rowContainer: {
 
    flexDirection: 'row',
 
    alignItems: 'center',
 
    justifyContent: 'space-between',
 
    marginBottom: 10,
 
    marginTop: 15,
 
    borderBottomWidth: 1,
 
    borderBottomColor: '#ccc',
 
    paddingBottom: 10,
 
  },
 
  column: {
 
    flex: 1,
 
    paddingHorizontal: 10,
 
  },
 
  container: {
 
    paddingHorizontal: 10,
 
  },
 
});
 
 
export default SecondPage;