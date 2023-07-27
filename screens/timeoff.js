import React, { useEffect, useState } from 'react';
 
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
 
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
 
 
const ThirdPage = ({navigation}) => {
 
  const [data, setData] = useState([]);
 
  const [loading, setLoading] = useState(true);
 
  const [error, setError] = useState(null); 
 
  const [isDeleteDisabled, setDeleteDisabled] = useState(false); 
 
 
  const url = "https://retoolapi.dev/SGpNie/time";
 
 
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
 
 
  const dele = async (id) => {
 
    const url = "https://retoolapi.dev/SGpNie/time";
 
    try {
 
      let result = await fetch(`${url}/${id}`, {
 
        method: "delete",
 
      });
 
      if (!result.ok) {
 
     
 
        throw new Error('Error!');
 
      }
 
      result = await result.json();
 
      if (result) {
 
        console.log("time off deleted!");
 
        fetchData();
 
      }
 
    } catch (error) {
 
      console.error(error); 
 
      setError('Failed to delete time off!');
 
    }
 
  };
 
 
  const formatSelectedDate = (dateString) => {
 
    if (!dateString) return null;
 
    const dateObj = new Date(dateString);
 
    const year = dateObj.getFullYear();
 
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
 
    const date = String(dateObj.getDate()).padStart(2, '0');
 
    return `${date}-${month}-${year}`;
 
  };
 
 
 
  return (
 
    <View style={styles.container}>
 
      {error ? (
 
        <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
 
      ) : loading ? (
 
        <Text style={{ color: 'black' }}>Loading....</Text>
 
      ) : (
 
        data.map((time, index) => (
 
          <View key={time.id} style={styles.rowContainer}>
 
            <View style={[styles.column, { flex: 1.2 }]}>
 
              <Text style={{ color: 'black' }}>{formatSelectedDate(time.selectedDate)} to  {formatSelectedDate(time.selectedDate2)}</Text>
 
            </View>
 
          
 
            <View style={styles.column}>
 
              <Text style={{ color: 'black' }}>{time.fromTime}</Text>
 
            </View>
 
            <View style={styles.column}>
 
              <Text style={{ color: 'black' }}>{time.toTime}</Text>
 
            </View>
 
            <View style={[styles.column, { flex: 0.3 }]}>
 
              <TouchableOpacity onPress={() => dele(time.id)} disabled={isDeleteDisabled && index === 0}>
 
                <Image
 
                  source={require('../assets/delete.png')}
 
                  style={{ height: 24, width: 24, opacity: isDeleteDisabled && index === 0 ? 0.5 : 1 }}
 
                />
 
              </TouchableOpacity>
 
            </View>
 
          </View>
 
        ))
 
      )}
 
      <View
 
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
 
        </View>
 
    </View>
 
  );
 
}
 
 
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
 
 
export default ThirdPage;