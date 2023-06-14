import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useLocalSearchParams } from 'expo-router';
import {Feather,FontAwesome5, Octicons} from 'react-native-vector-icons'
import { account, databases } from '../appwrite';
import { Button } from 'react-native-paper';

const width = Dimensions.get('screen').width;

const eventDetail = () => {

    const navigation = useNavigation();

    const { data } = useLocalSearchParams(); 

    const [modal,setModal] = useState(false); 

    const [message,setMesssage] = useState("");

    // const {id, data} = route?.params;


    // console.log("id: " + data.id);
    // console.log("title: " + data.event_name);   
    // console.log("date: " + new Date(data.dateTime).toISOString());  

    useLayoutEffect(() => {  
        navigation.setOptions({
            headerShown: true,
            headerTitle: data.event_name,
        })
    }, [])


    const [currentUser,setCurrentUser] = useState({})

    const [attendees,setAttendees] = useState([]);

    
    const user = account.get();
    useEffect(() => {
  
      user.then((result) => {
        // console.log("user result: " + result)  
        setCurrentUser(result);
      }).catch((error) => {console.log("error: " + error)});

      const listAttendees = databases.getDocument('647639e8382636fce548',
      '647639f9c81c54babcbc',data.$id)
      // console.log("listAttendees: " + listAttendees); 
      listAttendees.then((result) => {
        console.log("result of get documents present event: " + result.attendees);
        setAttendees(result.attendees);
      }).catch((error) => {console.log("error in doc get: " + error)});
      console.log("already registered: " + isAlreadyRegistered());
      isAlreadyRegistered(); 
    },[attendees,currentUser,isAlreadyRegistered])    

    const isAlreadyRegistered = () => {  
      // console.log("attendees check: " + attendees);
      if(attendees.includes(currentUser.email)){  
        return true; 
      }
      else{
        return false; 
      } 
    }



    // console.log("attendees: " + data.attendees);

    const onRegister = () => {
      console.log("currentUser: " + currentUser.email);

      // console.log("event id: " + data.$id);

      // const listAttendees = databases.getDocument('647639e8382636fce548',
      // '647639f9c81c54babcbc',data.$id)  
      // listAttendees.then((result) => {
      //   console.log("result of present event: " + result);
      //   setAttendees(result.attendees);
      // }).catch((error) => {console.log("error in doc get: " + error)});

      if(currentUser!=null){
        if(attendees.includes(currentUser.email)){
          setMesssage("You already registered for this event"); 
          setModal(modal => !modal);
        }
        else{
          const updateAttendees = databases.updateDocument('647639e8382636fce548',
          '647639f9c81c54babcbc',data.$id,{
            attendees: [...attendees,currentUser.email],
          });
          updateAttendees.then((result) => {
            console.log("result of update: " + result.attendees);
            setMesssage("You are registered for this event");
            setModal(modal => !modal);
          }).catch((error) => {console.log("error in doc update: " + error)});
        }
      }

    }



  return (
    <View style={styles.container}>
      {/* <Image source={{uri: data.image}} style={{width: '100%', height: width >370 ? 350 : 220, resizeMode: width > 370 ? 'cover' : 'stretch'}}/> */}
      {/* <Text style={styles.description}>{data.description}</Text> */}
  
      { modal && (
          <View style={styles.overlay}>
            <View style={styles.innerOverlay}>
              <Octicons name="issue-closed" size={40} color="green" />
              <Text style={styles.overlayText}>{message}</Text> 
              <Button mode="contained-tonal" style={styles.closeBtn} onPress={() => setModal(modal => !modal)}>
                Close
              </Button>
            </View>
          </View>
      )}

      <View style={styles.timeContainer}>
        <Feather name="clock" size={22} color="black" />
        <Text style={styles.timeText}>{new Date(data.dateTime).toString()}</Text>
        {/* <Text style={styles.timeText}>{data.time}</Text> */}
      </View>
      <View style={styles.attendeesContainer}>
        <Text style={styles.attendeesText}>Event Desscription: {data.description}</Text>
      </View>
      <View style={styles.attendeesContainer}>
        <FontAwesome5 name="users" size={22} color="#1c3a3e" />
        <Text style={styles.attendeesText}>Max no of Attendees: {data.capacity}</Text>
      </View>
      {currentUser.email!=null && 
      <View style={styles.ViewContainer}>   
          <TouchableOpacity style={isAlreadyRegistered() == true ? styles.registred : styles.btn } activeOpacity={0.6} onPress={onRegister}>
            {isAlreadyRegistered() == true ? <Text style={styles.btnText}>Registered</Text> : <Text style={styles.btnText}>Register Now</Text>}
          </TouchableOpacity>     
          {/* <TouchableOpacity style={styles.btnInfo} activeOpacity={0.6}>  
            <Text style={styles.btnText}>View More Info</Text>    
          </TouchableOpacity> */}
      </View>
      }
    </View>
  )
}

export default eventDetail

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  description:{
    fontSize: 16,
    paddingHorizontal: 10,
  },
  timeContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  timeText:{
    paddingHorizontal: 8,
  },
  attendeesContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  attendeesText:{
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  btn: {
    backgroundColor: "#1924fb",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 10,
  }, 
  registred: {
    backgroundColor: "lightgray",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 10,
  }, 
  btnInfo: {
    backgroundColor: "#c23535",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 10,
  },
  btnText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "400",
    paddingVertical: 2,
    paddingHorizontal: 20,
  },
  ViewContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    bottom: 0,
    position: "absolute",
  },

  overlay:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  innerOverlay:{
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center', 
    justifyContent: 'space-around',
    height: 200,
  },
  closeBtn:{
    paddingHorizontal: 10,
    paddingVertical: 5,
    width:'80%',
  },
})