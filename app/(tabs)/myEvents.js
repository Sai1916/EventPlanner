import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Agenda, Calendar } from 'react-native-calendars'
import { account, databases, storage } from '../../appwrite';
import { Query } from 'appwrite';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

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

      
      // eventsData.documents.map((event) => {
        
      //   const getEventFile = storage.getFile('64803265c286edb75d02',event.$id);
        
      //   getEventFile.then(function (response) {
      //     console.log("resp: ",response); // Success
      //   }, function (error) {
      //     console.log(error); // Failure
      //   });
      // })
      
      setEventsByMe(eventsData.documents);
    }
    
    data()
  },[eventsByMe]);


  const getEventImage = (id) => {
    const getEventFile = storage.getFilePreview('64803265c286edb75d02',id);
    const finalImage =  ""+getEventFile;
    // console.log("finalImage:---",finalImage);
    return finalImage;
  }
  
  // console.log("data from db:- ",eventsByMe);  
  
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
      <Text>Events Posted By Me</Text>
      {eventsByMe.map((event,index) => (
        <View key={index}>
          <TouchableOpacity
              key={index}
              // onPress={() => router.push({ pathname: '/eventDetail', params: {id: item.id, data: item} })}
              onPress={() => {
                // router.push({
                //   pathname: "/eventDetail",
                //   params: { id: item.id, title: item.title, item },
                // });
                // navigation.navigate("eventDetail", {
                //   data: item,
                // });
              }}
              style={{
                width: width > 370 ? "30%" : 'auto',
                height: width > 370 ? 280 : 'auto',
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 10,
                marginHorizontal: 14,
                // padding: 10,
                backgroundColor: "#ffffff",
                borderRadius: 10,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 8,
                  height: 18,
                },
                shadowOpacity: 0.25,
                shadowRadius: 16,
                elevation: 10,
              }}
            >
              <Image source={{ uri: getEventImage(event.$id) }} style={styles.image} />
              <View style={styles.innerView}>
                <Text
                  style={{ fontSize: 16, fontWeight: "400", color: "#000000" }}
                >
                  {event.event_name}
                </Text>
                {/* <Text style={{ fontSize: 12, fontWeight: "400", color: "#000000" }}>
                {new Date(event.event_date).toLocaleString()}
                {new Date(event.event_date).toString()}
              </Text>      */}
              </View> 
            </TouchableOpacity>
        </View>
      ))}

      <Text>Events I registerd for</Text>

    </View>
  )
}

export default myEvents

const styles = StyleSheet.create({
  container:{
    flex:1,
    // paddingVertical: 10,
  },
  image: {
    width: "100%",
    height: width > 370 ? 250 : 200,
    resizeMode: width > 370 ? "cover" : "contain",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  innerView: {
    // position: "absolute",
    // bottom: 6,
    // right: 14,
    // backgroundColor: "#a5c6ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    // borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
})