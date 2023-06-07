import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Agenda, Calendar } from 'react-native-calendars'
import { account, databases } from '../../appwrite';
import { Query } from 'appwrite';


const myEvents = () => {
  
  const [eventsByMe, setEventsByMe] = useState([]);

  const [currentUser,setCurrentUser] = useState({})

  const user = account.get();

  user.then((result) => {
    setCurrentUser(result);
  }).catch((error) => {console.log("error: " + error)});

  useEffect(() => {

    async function data(){
      
      const eventsData = await databases.listDocuments(
        // process.env.APPWRITE_DATABASE_ID,  
        '647639e8382636fce548',
        // process.env.APPWRITE_COLLECTION_ID,
        '647639f9c81c54babcbc',
        // process.enc.APPWRITE_STORAGE_BUCKET_ID,
        // '64803265c286edb75d02', 
        [
          Query.equal("organizer_email", currentUser.email ),   
          // Query.orderAsc("capacity"), 
        ]
      );        
      
      // events = eventsData.documents;
      setEventsByMe(eventsData.documents);
    }
    
    data()
  },[eventsByMe]);
  
  console.log("data from db:- ",eventsByMe);  


  // const [events, setEvents] = useState([]);
  
  const [selected, setSelected] = useState('');
  const dates = [
    {
      date: '2021-05-24',
    },
    {
      date: '2021-05-25',
    },{
      date: '2021-05-26',
    }
  ]

  // console.log("events: " + events);

  return (
    <View style={styles.container}>
      {/* <Calendar 
        onDayPress={(day) => {console.log('selected day', day);
        setSelected(day.dateString)}}
        markedDates={{
          [selected]: {selected: true, marked: true, disableTouchEvent: true},
          '2023-05-24': {selected: true, marked: true, selectedColor: 'blue'},
          '2023-05-25': {marked: true},
    // '2023-05-26': {selected: true, marked: true, selectedColor: 'blue'}
        }}
      /> */}

      {/* <Agenda 
        items={{
          '2023-05-27': [{name: 'item 1 - any js object'}],
          '2023-05-28': [{name: 'item 2 - any js object', height: 80}],
          '2023-05-29': [],
          '2023-05-30': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
        }}
        selected={'2023-05-29'}
        renderItem={(item, index) => {return (<View key={index}><Text>{item.name}</Text></View>)}}
        hideKnob={false}
      /> */}

      {eventsByMe.map((event,index) => (
        <View key={index}>
          {/* <Text>{event.date}</Text> */}
          <Text>{event.event_name}</Text>
        </View>
      ))}
    </View>
  )
}

export default myEvents

const styles = StyleSheet.create({
  container:{
    flex:1,
    // paddingVertical: 10,
  }
})