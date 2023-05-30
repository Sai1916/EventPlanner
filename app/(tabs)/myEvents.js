import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Agenda, Calendar } from 'react-native-calendars'
import { account, databases } from '../../appwrite';



// let events = [
// //   {
// //   id: 1,
// //   title: "Dance Party",
// //   description: "This is event 1",
// // }
// ];

// const 



// export const onRegister = (item) => {
//   console.log("item: " + item.title);
//   // setEvents([...events, item]);
//   events = [...events, item];
// }

const myEvents = () => {
  
  const [events, setEvents] = useState([]);

  useEffect( () => {

    async function data(){
      
      const eventsData = await databases.listDocuments(
        // process.env.APPWRITE_DATABASE_ID,  
        '647639e8382636fce548',
        // process.env.APPWRITE_COLLECTION_ID,
        '647639f9c81c54babcbc'
      );        
        console.log("data from db:- ",eventsData.documents);  
        console.log("data from db:- ",account.deleteSessions());  

        // events = eventsData.documents;
        setEvents(eventsData.documents);
      }
      
      data()
  }

  ,[])



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

      {events.map((event,index) => (
        <View key={index}>
          {/* <Text>{event.date}</Text> */}
          <Text>{event.title}</Text>
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