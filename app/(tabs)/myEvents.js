import {
  ActivityIndicator,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Agenda, Calendar } from "react-native-calendars";
import { account, databases, storage } from "../../appwrite";
import { Query } from "appwrite";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID, APPWRITE_BUCKET_ID } from '@env';  

const width = Dimensions.get("screen").width; 
const height = Dimensions.get("screen").height;

const myEvents = () => {
  const [eventsByMe, setEventsByMe] = useState([]);
  const [eventsRegisteredByMe, setEventsRegisteredByMe] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const [loading, setLoading] = useState(true);

  const [refreshing,setRefreshing] = useState(false);

  const user = account.get();

  const navigation = useNavigation();

  async function data() {
    const eventsData = await databases.listDocuments(
      // process.env.APPWRITE_DATABASE_ID,
      APPWRITE_DATABASE_ID,
      // process.env.APPWRITE_COLLECTION_ID,
      APPWRITE_COLLECTION_ID, 
      [
        Query.equal("organizer_email", currentUser.email),
        // Query.orderAsc("capacity"),
      ]
    );

    const totalDocuments = await databases.listDocuments(
      // process.env.APPWRITE_DATABASE_ID,
      APPWRITE_DATABASE_ID,
      // process.env.APPWRITE_COLLECTION_ID,
      APPWRITE_COLLECTION_ID, 
    );

    let eventsRegistered = [];

    totalDocuments.documents.map((event) => {
      if (event.attendees.includes(currentUser.email)) {
        eventsRegistered.push(event);
      }
    });

    // console.log("eventsRegisteredByMe: ",eventsRegistered);

    setEventsRegisteredByMe(eventsRegistered);

    // eventsData.documents.map((event) => {

    //   const getEventFile = storage.getFile('64803265c286edb75d02',event.$id);

    //   getEventFile.then(function (response) {
    //     console.log("resp: ",response); // Success
    //   }, function (error) {
    //     console.log(error); // Failure
    //   });
    // })

    setEventsByMe(eventsData.documents);

    setLoading(false);
  }


  const onRefresh = () => {
    setRefreshing(true);
    data();  
    setRefreshing(false); 
  }

  useEffect(() => {
    user
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((error) => {
        console.log("error: " + error);
      });

    // setLoading(true);
    data();
  });

  const getEventImage = (id) => {
    const getEventFile = storage.getFilePreview(APPWRITE_BUCKET_ID, id);
    const finalImage = "" + getEventFile;
    // console.log("finalImage:---",finalImage);
    return finalImage;
  };

  // console.log("data from db:- ",eventsByMe);

  const [selected, setSelected] = useState("");
  const dates = [
    {
      date: "2021-05-24",
    },
    {
      date: "2021-05-25",
    },
    {
      date: "2021-05-26",
    },
  ];

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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading.....</Text>
        </View>
      ) : (
        <ScrollView 
          // contentContainerStyle={{ backgroundColor: "#ffffff" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.titleHeading}>Events Posted By Me</Text>
          {eventsByMe.map((event, index) => (
            <View key={index}>
              <TouchableOpacity
                key={index}
                style={{
                  width: width > 370 ? "30%" : "auto",
                  height: width > 370 ? 280 : "auto",
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
                {/* { (event.image != "n/a" || event.image != "-") && <Image source={{ uri: getEventImage(event.$id) }} style={styles.image} /> } */}
                <View style={styles.innerView}>
                  <Text style={styles.eventText}>
                    Event Title: {event.event_name} 
                  </Text>
                  <Text style={styles.eventText}>
                    Event Description: {event.description}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      color: "#000000",
                    }}
                  >
                    {new Date(event.dateTime).toUTCString()}
                    {/* {new Date(event.event_date).toString()} */}
                  </Text>
                  <Text style={styles.eventText}>
                    Event Address: {event.address}
                  </Text>
                </View>
                <View style={styles.btnContainer}>
                  {/* <Button
                    mode="outlined"
                    onPress={() => {}
                      // navigation.navigate("updateEventDetails", {
                      //   data: event,
                      // })
                    }
                  >
                    View Event Info
                  </Button> */}
                  <Button
                    mode="contained-tonal"
                    onPress={() =>
                      navigation.navigate("updateEventDetails", {
                        data: event,
                      })
                    }
                  >
                    Update Details
                  </Button>
                </View>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={styles.titleHeading}>Events I registerd for</Text>

          {eventsRegisteredByMe.map((event, index) => (
            <View key={index}>
              <TouchableOpacity
                // onPress={() => {
                //   // router.push({
                //   //   pathname: "/eventDetail",
                //   //   params: { id: item.id, title: item.title, item },
                //   // });
                //   navigation.navigate("eventDetail", {
                //     data: event,
                //   });
                // }}
                key={index}
                style={{
                  width: width > 370 ? "30%" : "auto",
                  height: width > 370 ? 280 : "auto",
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 10,
                  marginHorizontal: 14,
                  flexDirection: "row",
                  padding: 10,
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
                {/* <Image source={{ uri: getEventImage(event.$id) }} style={styles.image} /> */}
                <View style={styles.innerView}>
                  <Text style={styles.eventText}>
                    Event Title: {event.event_name}
                  </Text>
                  <Text style={styles.eventText}>
                    Event Description: {event.description}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",  
                      color: "#000000",
                    }}
                  >
                    {new Date(event.dateTime).toUTCString()}
                    {/* {new Date(event.event_date).toString()} */}
                  </Text>
                </View>
                <Button
                    icon="arrow-right"
                    contentStyle={{ flexDirection: "row-reverse" }}
                    mode="elevated"
                    onPress={() =>
                      navigation.navigate("eventDetail", {
                        data: event,
                      })
                    }
                  >
                    View
                  </Button>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default myEvents;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    // backgroundColor: "white",
    width: "100%",
    height: "100%",
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
    // flexDirection: "row",
    alignItems: "flex-start",
    width: "70%",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  titleHeading: {
    fontSize: 20,
    fontWeight: "300",
    margin: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
    margin: 20,
    fontFamily: "sans-serif",
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 8,
  },
  eventText: {
    fontSize: 16,
    fontWeight: "400",
    paddingVertical: 5,
  },
});
