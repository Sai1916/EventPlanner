import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useLocalSearchParams } from 'expo-router';
import {Feather,FontAwesome5} from 'react-native-vector-icons'
import { onRegister } from './(tabs)/myEvents';


const width = Dimensions.get('screen').width;

const eventDetail = () => {

    const navigation = useNavigation();

    const { data } = useLocalSearchParams(); 

    // const {id, data} = route?.params;


    console.log("id: " + data.id);
    console.log("title: " + data.title);  
    console.log("data: " + data.date);  

    useLayoutEffect(() => {  
        navigation.setOptions({
            headerShown: true,
            headerTitle: data.title,
        })
    }, [])



  return (
    <View style={styles.container}>
      <Image source={{uri: data.image}} style={{width: '100%', height: width >370 ? 350 : 220, resizeMode: width > 370 ? 'cover' : 'stretch'}}/>
      <Text style={styles.description}>{data.description}</Text>
      <View style={styles.timeContainer}>
        <Feather name="clock" size={22} color="black" />
        <Text style={styles.timeText}>{data.date}</Text>
        <Text style={styles.timeText}>{data.time}</Text>
      </View>
      <View style={styles.attendeesContainer}>
        <FontAwesome5 name="users" size={22} color="#1c3a3e" />
        <Text style={styles.attendeesText}>Max no of Attendees: {data.maxAttendees}</Text>
      </View>
      <View style={styles.ViewContainer}>
          <TouchableOpacity style={styles.btn} activeOpacity={0.6} onPress={() => onRegister(data)}>
            <Text style={styles.btnText}>Register Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnInfo} activeOpacity={0.6}>
            <Text style={styles.btnText}>View More Info</Text>
          </TouchableOpacity>
      </View>
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
})