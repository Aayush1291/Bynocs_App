import {
  Icon,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Alert,
  Image,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
// import { Calendar } from 'react-native-calendars'
import moment, { duration } from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Calendar from './Calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const generateTimeSlots = (startTime, endTime, duration) => {
  const slots = [];
  const format = 'h:mm A';
  const start = moment(startTime, 'h:mm A');
  const end = moment(endTime, 'h:mm A');
  const timeSlotDuration = moment.duration(duration, 'minutes');

  let slotStart = start.clone();
  while (slotStart.isBefore(end)) {
    const slotEnd = slotStart.clone().add(timeSlotDuration);
    if (slotEnd.isAfter(end)) {
      break;
    }
    const isBetweenNoonSlots = slotStart.isBefore(moment('1:00 PM', 'h:mm A')) &&
      slotEnd.isAfter(moment('12:00 PM', 'h:mm A'));
    if (!isBetweenNoonSlots) {
      slots.push({
        start: slotStart.format(format),
        end: slotEnd.format(format),
      });
    }
    slotStart = slotEnd;
  }
  return slots;
};

const Book_Appointment = () => {
  const [apiContent, setApiContent] = useState(null);
  let [timeSlotDuration, setTimeSlotDuration] = useState(60);

  // const [selectedTime, onSelectTime] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [morning, setMorning] = useState(false);
  const [day, setDay] = useState(false);
  const [night, setNight] = useState(false);

  const [morningData, setMorningData] = useState([]);
  const [dayData, setDayData] = useState([]);
  const [nightData, setNightData] = useState([]);

  const [roleData, setroleData] = useState('');
  const [roles, setroles] = useState(false);

  const [data, setData] = useState([]);
  const [serviceName, setServiceName] = useState(null);
  const [showDuration, setShowDuration] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, onSelectCategory] = useState([]);
  const [selectedDate, setDate] = useState('');
  const [selectDay, setselectDay] = useState('');
  let day1;

  const [morningSlots,setmorningSlots ]  = useState([]);
  const [afternoonSlots,setafternoonSlots ]  = useState([]);
  const [eveningSlots,seteveningSlots ]  = useState([]);
  let username = '';
  let email = '';
  let startTimeUser;
  let endTimeUser;
  // let selectrole = 1;

  function formatDate(dateString) {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    return `${month}/${day}/${year}`;
  }

  const handleSubmission = async () => {
    username = await AsyncStorage.getItem('UserName');
    email = await AsyncStorage.getItem('Email');
    // await AsyncStorage.setItem("Email","harshmaghnani@gmail.com");
    console.log('HANDLE SUBMISSION');
    console.log('DATE : ', selectedDate)
    console.log('CATEGORY : ', selectedCategory);
    console.log('TIME : ', selectedTime);
    console.log('USERNAME : ', username);
    console.log('EMAIL : ', email);
    const currentDate = new Date();
    const currentTime = new Date();

    const date = currentDate.toLocaleDateString();
    const time = currentTime.toLocaleTimeString();

    console.log(`Date: ${date}`);
    console.log(`Time: ${time}`);

    if (!serviceName || !timeSlotDuration ||!selectedSlot ||!date) {
      Alert.alert('Error', 'Fill all fields');
    } else {
      if (username == '' || email == '') {
        Alert.alert('Error', 'Fields not found!');
      } else {
        try {
          // let formattedDate = formatDate(selectedDate);
          console.log('DATE :', selectedDate)
          const response = await fetch('https://retoolapi.dev/gRkVuw/data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              timeSlotDuration: timeSlotDuration,
              serviceName: serviceName,
              selectedSlot: selectedSlot,
              date: date
            }),
          });
          if (response.ok) {

            Alert.alert('Appointment booked successfully');
          } else {

            console.error('Failed to book appointment');
          }
        } catch (error) {
          console.error('Error booking appointment:', error);
        }

      }
    }
  };

  const onSelectTime = (time) => {
    setSelectedTime(time); // Set the selectedTime to the clicked timeslot's time
  };

  useEffect(() => {
    fetchApiContent();
  }, []);

  const fetchApiContent = async () => {
    try {
      const response = await fetch('https://retoolapi.dev/U8SZex/data');
      const data = await response.json();
      setApiContent(data);

      //roles
      const roleresponse = await fetch('https://myjsons.com/v/489d1424');
      const rolejsondata = await roleresponse.json();
      setroleData(rolejsondata.check);
      console.log(rolejsondata);

      //time
      const responseTimes = await fetch('https://myjsons.com/v/56461432');
        const jsonData = await responseTimes.json();
        setData(jsonData);
    } catch (error) {
      console.error('Error fetching API content:', error);
    }
  };


  // const fetchAPIData = async () => {


  // };


  if (!apiContent) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const findStartAndEndTime = () => {
    console.log("abc", selDay)
    const selection = data.find((element)=> element.weekday===selDay && element.username===names);
    console.log("dummy", selection)
    if(selection){
      console.log("day is in api")
      console.log("selection start",selection.start)
      const { start, end } = selection;
      console.log('Start Time:', start);
      console.log('End Time:', end);
      startTimeUser = start;
      startEndUser = end;
      console.log("FIND : ")
      console.log("START : ",startTimeUser);
      console.log("END : ",startEndUser);
       timeSlots=[];
       timeSlots = generateTimeSlots(start,end, timeSlotDuration);
       console.log(timeSlots);
       timedivision();
    }
    else{
      console.log("No item");
      setmorningSlots([]);
      setafternoonSlots([]);
      seteveningSlots([]);
    }
    // if (selectedRoleData) {
    //   // The selected role is found in the data array
    //   const { start, end } = selectedRoleData;
    //   console.log('Start Time:', start);
    //   console.log('End Time:', end);
    //   startTimeUser = start;
    //   startEndUser = end;
    //   console.log("FIND : ")
    //   console.log("START : ",startTimeUser);
    //   console.log("END : ",startEndUser);
    //    timeSlots=[];
    //    timeSlots = generateTimeSlots(start,end, timeSlotDuration);
    //    console.log(timeSlots);
    //    timedivision();
    // } else {
    //   console.log('Selected role not found in the data array');
    // }
  };
 
  let names ;
  let durations = 60;


  function durationChange (d) {
    console.log("DURATION : ",d);
    console.log("user start", startTime);
    console.log("user end", endTime);
    durations=d;
    setTimeSlotDuration(durations);
    timeSlots=[];
    timeSlots = generateTimeSlots(startTime,endTime, durations);
    console.log("ts",timeSlots);
    timedivision();
  }


  const dummyfunc = (name)=>{
    // console.log(name);
    setShowDuration(true);
    names=name;
    // console.log(name);
    setServiceName(name);
    // console.log("Names",names);
    console.log(serviceName);
    console.log("dummy func", selDay)
    findStartAndEndTime();
    // Call the function to find start and end times
  }
  // console.log(selectedDate);
  // console.log(selectDay);

  let selDay = selectDay;

  // Extract start and end time from the API content
  const startTime = apiContent[0].start;
  const endTime = apiContent[0].end;
  // const weekDay = apiContent[0].weekday;
  // console.log(weekDay);


  let timeSlots = generateTimeSlots(startTime, endTime, timeSlotDuration);


  //for dividing the time into morning, afternoon, evening
  function timedivision(){
    let morning=[];
    let day=[];
    let night=[];
    timeSlots.forEach((slot) => {
      const slotStart = moment(slot.start, 'h:mm A');
      if (slotStart.isBefore(moment('12:00 PM', 'h:mm A'))) {
        morning.push(slot);
      } else if (slotStart.isSameOrAfter(moment('4:00 PM', 'h:mm A'))) {
        night.push(slot);
      } else {
        day.push(slot);
      }
    });
    setmorningSlots(morning);
    setafternoonSlots(day);
    seteveningSlots(night);
  }
 
  // timedivision();


  function returntime(e) {
    // console.log(e);
    setSelectedSlot(e);
    // console.log(selectedSlot);
  }

  function newFunc (newD){
    setselectDay(newD);
    selDay=newD;
    console.log("new day", selDay);
    findStartAndEndTime();
  }

  // console.log(serviceName);
 
  return (
    <ScrollView>
      <View style={{ marginHorizontal: responsiveWidth(4) }}>
        <View style={{ borderRadius: 15, marginTop: 20 }}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontFamily: 'Poppins-Regular',
            }}>
            {' '}
            Choose Date{' '}
          </Text>
          <Calendar onSelectDate={setDate} selected={selectedDate} onSelectDay={(d)=>{newFunc(d)}} selectedDay={selectDay}/>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={{
            color: 'black',
            fontSize: 15,
            fontFamily: 'Poppins-Regular',
          }}> Select Role </Text>

          <TouchableOpacity onPress={() => {
            roles ? setroles(false) : setroles(true);
          }}>
            <AntDesign
              name={roles ? 'upcircle' : 'downcircle'}
              style={{ color: 'grey' }}
              size={15}
            />
          </TouchableOpacity>
        </View>

        {roles ? (
          <View>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'grey',
                marginBottom: 10,
              }}
            />

            <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
              {roleData.map((element,index) => {
                return (
                  <TouchableOpacity
                  key={element.id}
                  onPress={()=> dummyfunc(element.username)}
                  >
                      {element.role === 1 && (
                        <View style={[{
                          borderWidth: 1,
                          borderColor: 'grey',
                          borderRadius: 40,
                          marginHorizontal:10,
                          marginTop: 10,
                       
                        },{
                            backgroundColor:
                              serviceName === element.username
                                ? '#175CA4'
                                : 'white',
                        }]}>
                        <Text style={[{
                          color: 'black',
                          marginHorizontal: 14,
                          fontSize: 12,
                          marginVertical: 7,
                          fontFamily: 'Poppins-Regular',
                        },
                        {
                          color:
                            serviceName === element.username
                              ? 'white'
                              : 'black',
                      }]}>
                          {element.username}
                        </Text>
                        </View>
                      )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )
          : null}
        {/* <View style={{ borderRadius: 15, marginTop: 20 }}>
          <TouchableOpacity onPress={() => durationChange(60)} style={{ borderWidth: 1, borderColor: 'black', marginBottom: 10 }}>
            <Text style={{ color: 'black' }}>60 mins</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => durationChange(45)} style={{ borderWidth: 1, borderColor: 'black', marginBottom: 10 }}>
            <Text style={{ color: 'black' }}>45 mins</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => durationChange(30)} style={{ borderWidth: 1, borderColor: 'black', marginBottom: 10 }}>
            <Text style={{ color: 'black' }}>30 mins</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => durationChange(15)} style={{ borderWidth: 1, borderColor: 'black', marginBottom: 10 }}>
            <Text style={{ color: 'black' }}>15 mins</Text>
          </TouchableOpacity>
        </View> */}
        <Text style={{
            color: 'black',
            fontSize: 15,
            fontFamily: 'Poppins-Regular',
            marginTop:10
          }}> Select Category </Text>
<ScrollView horizontal>
<View style={{ flexDirection: 'row',
                borderColor: 'black',
                // borderRadius: 10,
                // justifyContent:'center'
                // alignItems:'center'
                 }}>
          <TouchableOpacity onPress={() => durationChange(60)} >
          <View  style={[
                        {
                          borderWidth: 1,
                          borderColor: 'black',
                          borderRadius: 10,
                          height: 70,
                          marginHorizontal: 10,
                          marginTop: 10,
                        },
                        {
                          backgroundColor:
                            // selectedCategory === element.category
                            timeSlotDuration === 60
                              ? '#175CA4'
                              : 'white',
                        }]}>  
             <Text style={[{ color: 'black',fontFamily:'Poppins-Regular', marginTop:13,marginHorizontal:10},{  color:
                            timeSlotDuration === 60
                                ? 'white'
                                : 'black',}]}> Introduction To Bynocs </Text>
             <Text style={[{ color: 'black',fontFamily:'Poppins-Regular',marginHorizontal:15}, {
                            color:
                            timeSlotDuration === 60
                                ? 'white'
                                : 'black',
                          },]}>60 mins</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => durationChange(45)}>
          <View  style={[
                        {
                          borderWidth: 1,
                          borderColor: 'black',
                          borderRadius: 10,
                          height: 70,
                          marginHorizontal: 10,
                          marginTop: 10,
                        },
                        {
                          backgroundColor:
                            // selectedCategory === element.category
                            timeSlotDuration === 45
                              ? '#175CA4'
                              : 'white',
                        }]}>
            <Text style={[{ color: 'black',fontFamily:'Poppins-Regular', marginTop:13,marginHorizontal:10},{  color:
                            timeSlotDuration === 45
                                ? 'white'
                                : 'black',}]}> Initial Assessment </Text>
            <Text style={[{ color: 'black',fontFamily:'Poppins-Regular',marginHorizontal:15}, {
                            color:
                            timeSlotDuration === 45
                                ? 'white'
                                : 'black',
                          },]}>45 mins</Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => setTimeSlotDuration(45)}>
          <View  style={[
                        {
                          borderWidth: 1,
                          borderColor: 'black',
                          borderRadius: 10,
                          height: 70,
                          marginHorizontal: 10,
                          marginTop: 10,
                        },
                        {
                          backgroundColor:
                            // selectedCategory === element.category
                            timeSlotDuration === 45
                              ? '#175CA4'
                              : 'white',
                        }]}>
            <Text style={[{ color: 'black',fontFamily:'Poppins-Regular', marginTop:13,marginHorizontal:10},{  color:
                            timeSlotDuration === 45
                                ? 'white'
                                : 'black',}]}> Follow Up Assessment </Text>
            <Text style={[{ color: 'black',fontFamily:'Poppins-Regular',marginHorizontal:15}, {
                            color:
                            timeSlotDuration === 45
                                ? 'white'
                                : 'black',
                          },]}>45 mins</Text>
          </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => durationChange(15)}>
          <View  style={[
                        {
                          borderWidth: 1,
                          borderColor: 'black',
                          borderRadius: 10,
                          height: 70,
                          marginHorizontal: 10,
                          marginTop: 10,
                        },
                        {
                          backgroundColor:
                            // selectedCategory === element.category
                            timeSlotDuration === 15
                              ? '#175CA4'
                              : 'white',
                        }]}>
            <Text style={[{ color: 'black',fontFamily:'Poppins-Regular', marginTop:13,marginHorizontal:10},{  color:
                            timeSlotDuration === 15
                                ? 'white'
                                : 'black',}]}> Technical Support </Text>
            <Text style={[{ color: 'black',fontFamily:'Poppins-Regular',marginHorizontal:15}, {
                            color:
                            timeSlotDuration === 15
                                ? 'white'
                                : 'black',
                          },]}>15 mins</Text>
            </View>
          </TouchableOpacity>
        </View>
        </ScrollView>
       
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontFamily: 'Poppins-Regular',
            }}>
            {' '}
            Choose Time{' '}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={require('../assets/halfsun.png')}
                style={{ width: 30, height: 18, marginTop: 5 }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontFamily: 'Poppins-Regular',
                }}>
                {' '}
                Morning{' '}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                morning ? setMorning(false) : setMorning(true);
              }}>
              <AntDesign
                name={morning ? 'upcircle' : 'downcircle'}
                style={{ color: 'grey' }}
                size={15}
              />
            </TouchableOpacity>
          </View>

          {morning ? (
            <View style={{ marginTop: 15 }}>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: 'grey',
                  marginBottom: 10,
                }}
              />
              <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                {morningSlots.map((slot, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => returntime(slot.end)}
                    >
                      <View
                        style={[
                          {
                            borderWidth: 1,
                            borderColor: 'grey',
                            borderRadius: 40,
                            marginHorizontal: 10,
                            marginTop: 10,
                            // backgroundColor:'red'
                          },
                          {
                            backgroundColor:
                              selectedSlot === slot.end
                                ? '#175CA4'
                                : 'white',
                          },
                        ]}>
                        <Text
                          key={index}
                          style={[
                            {
                              color: 'black',
                              marginHorizontal: 14,
                              fontSize: 12,
                              marginVertical: 7,
                              fontFamily: 'Poppins-Regular',
                            },
                            {
                              color:
                                selectedSlot === slot.end
                                  ? 'white'
                                  : 'black',
                            },
                          ]}>
                          {slot.start} - {slot.end}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={require('../assets/sun.png')}
                style={{ width: 30, height: 30 }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontFamily: 'Poppins-Regular',
                }}>
                {' '}
                Day{' '}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                day ? setDay(false) : setDay(true);
              }}>
              <AntDesign
                name={day ? 'upcircle' : 'downcircle'}
                style={{ color: 'grey' }}
                size={15}
              />
            </TouchableOpacity>
          </View>

          {day ? (
            <View style={{ marginTop: 15 }}>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: 'grey',
                  marginBottom: 10,
                }}
              />
              <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                {afternoonSlots.map((slot, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => returntime(slot.end)}
                    >
                      <View
                        style={[
                          {
                            borderWidth: 1,
                            borderColor: 'grey',
                            borderRadius: 40,
                            marginHorizontal: 10,
                            marginTop: 10,
                            // backgroundColor:'red'
                          },
                          {
                            backgroundColor:
                              selectedSlot === slot.end
                                ? '#175CA4'
                                : 'white',
                          },
                        ]}>
                        <Text
                          key={index}
                          style={[
                            {
                              color: 'black',
                              marginHorizontal: 14,
                              fontSize: 12,
                              marginVertical: 7,
                              fontFamily: 'Poppins-Regular',
                            },
                            {
                              color:
                                selectedSlot === slot.end
                                  ? 'white'
                                  : 'black',
                            },
                          ]}>
                          {slot.start} - {slot.end}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={require('../assets/moon.png')}
                style={{ width: 24, height: 28, marginLeft: 5 }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontFamily: 'Poppins-Regular',
                }}>
                {' '}
                Night{' '}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                night ? setNight(false) : setNight(true);
              }}>
              <AntDesign
                name={night ? 'upcircle' : 'downcircle'}
                style={{ color: 'grey' }}
                size={15}
              />
            </TouchableOpacity>
          </View>

          {night ? (
            <View style={{ marginTop: 15 }}>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: 'grey',
                  marginBottom: 10,
                }}
              />
              <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                {eveningSlots.map((slot, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => returntime(slot.end)}
                    >
                      <View
                        style={[
                          {
                            borderWidth: 1,
                            borderColor: 'grey',
                            borderRadius: 40,
                            marginHorizontal: 10,
                            marginTop: 10,
                            // backgroundColor:'red'
                          },
                          {
                            backgroundColor:
                              selectedSlot === slot.end
                                ? '#175CA4'
                                : 'white',
                          },
                        ]}>
                        <Text
                          key={index}
                          style={[
                            {
                              color: 'black',
                              marginHorizontal: 14,
                              fontSize: 12,
                              marginVertical: 7,
                              fontFamily: 'Poppins-Regular',
                            },
                            {
                              color:
                                selectedSlot === slot.end
                                  ? 'white'
                                  : 'black',
                            },
                          ]}>
                          {slot.start} - {slot.end}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
          ) : null}
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={{}}
            onPress={handleSubmission}
          >
            <View
              style={{
                color: 'white',
                width: '90%',
                backgroundColor: '#175CA4',
                height: 40,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontFamily: 'Poppins-Regular',
                }}>
                Set Date & Time
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default Book_Appointment;