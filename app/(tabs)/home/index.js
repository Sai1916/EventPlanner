import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  LogBox,
  RefreshControl
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { EvilIcons } from "react-native-vector-icons";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { Query } from "appwrite";
import { account, databases } from "../../../appwrite";
import { Button } from "react-native-paper";

const width = Dimensions.get("screen").width;

const home = () => {
  const navigation = useNavigation();

  const router = useRouter();

  LogBox.ignoreAllLogs(true)

  // console.log("width: " + width);

  const events = [
    {
      id: 1,
      title: "Dance Party",
      description: "This is event 1",
      date: "2021-09-01",
      time: "12:00",
      location: "Hyderabad",
      maxAttendees: 100,
      image:
        "https://www.amusephiladelphia.com/wp-content/uploads/2018/08/34735177654_35eb166e10_k.jpg",
    },
    {
      id: 2,
      title: "Sports Event",
      description: "This is event 1",
      date: "2021-09-01",
      time: "12:00",
      location: "Vijayawada",
      maxAttendees: 100,
      image:
        "https://th.bing.com/th/id/OIP.BLDwLyRNh0jTaWX5lFiGpAHaE8?pid=ImgDet&rs=1",
    },
    {
      id: 3,
      title: "Coorporate Event",
      description: "This is event 1",
      date: "2021-09-01",
      time: "12:00",
      location: "New Delhi",
      maxAttendees: 100,
      image:
        "https://spanishcity.co.uk/wp-content/uploads/2020/05/shutterstock_768475918-scaled.jpg",
    },
    {
      id: 4,
      title: "Coorporate Event",
      description: "This is event 1",
      date: "2021-09-01",
      time: "12:00",
      location: "Bangalore",
      maxAttendees: 100,
      image:
        "https://spanishcity.co.uk/wp-content/uploads/2020/05/shutterstock_768475918-scaled.jpg",
    },
  ];

  const [eventsData, setEventsData] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const [loading, setLoading] = useState(true);

  const [refreshing,setRefreshing] = useState(false);

  const user = account.get();

    useEffect(() => {
      user
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((error) => {
        setCurrentUser({});
        console.log("error in home: " + error);
      });
    },[currentUser])

    async function data() {
      const eventsData = await databases.listDocuments(
        // process.env.APPWRITE_DATABASE_ID,
        "647639e8382636fce548",
        // process.env.APPWRITE_COLLECTION_ID,
        "647639f9c81c54babcbc",
        // process.enc.APPWRITE_STORAGE_BUCKET_ID,
        // '64803265c286edb75d02',
        [
          Query.notEqual("organizer_email", currentUser.email),
          // Query.orderAsc("capacity"),
        ]
      );

      setEventsData(eventsData.documents);

      setLoading(false);
    }

  useEffect(() => {
    data();
  });

  const onRefresh = () => {
    setRefreshing(true);
    data();
    setRefreshing(false); 
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      contentContainerStyle={{
        paddingVertical: 10,
        backgroundColor: "#ffffff",
        // flex: 1,
        width: "100%",
        height: "100%",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* { modal ? (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>{params?.message}</Text>
            <Text onPress={() => setModal(!modal)}>Close</Text>
          </View>
      ) : <></>} */}

      <View style={styles.ViewContainer}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() => router.push("/home/createEvent")}
        >
          <Text style={styles.btnText}>Create an Event</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnText}>Reserve a Seat</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnText}>Create an Event</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnText}>Create an Event</Text>
        </TouchableOpacity> */}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading.....</Text>
        </View>
      ) : (
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: "#000000",
              paddingVertical: 10,
              textAlign: "center",
            }}
          >
            Events
          </Text>
          <View
            style={
              width > 370 ? styles.itemsContainer : styles.mobileItemsContainer
            }
          >
            {eventsData.length > 0 ? (
              eventsData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  // onPress={() => router.push({ pathname: '/eventDetail', params: {id: item.id, data: item} })}
                  // onPress={() => {
                  //   // router.push({
                  //   //   pathname: "/eventDetail",
                  //   //   params: { id: item.id, title: item.title, item },
                  //   // });
                  //   navigation.navigate("eventDetail", {
                  //     data: item,
                  //   });
                  // }}
                  style={{
                    width: width > 370 ? "30%" : "auto",
                    height: width > 370 ? 280 : "auto",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
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
                  {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
                  <View style={styles.innerView}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "400",
                        color: "#000000",
                        marginVertical: 10,
                      }}
                    >
                      {item.event_name}
                    </Text>

                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "400",
                        color: "#000000",
                        marginVertical: 10,
                      }}
                    >
                      {new Date(item.dateTime).toUTCString()}
                    </Text>
                  </View>
                  <Button
                    icon="arrow-right"
                    contentStyle={{ flexDirection: "row-reverse" }}
                    mode="elevated"
                    onPress={() =>
                      navigation.navigate("eventDetail", {
                        data: item,
                      })
                    }
                  >
                    View
                  </Button>
                  {/* <View style={{ flexDirection: "row", alignItems: "center" }}> 
                  <EvilIcons name="location" size={20} color="black" />
                  <Text
                    style={{ 
                      fontSize: 14,
                      fontWeight: "400",
                      color: "#000000",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.location}
                  </Text>
                </View> */}
                </TouchableOpacity>
              ))
            ) : (
              <View style={{
                width: width > 370 ? "30%" : "auto",
                height: width > 370 ? 280 : "auto",
                alignItems: "center",
                justifyContent: "center", 
              }}>
                <Text style={styles.noEventsText}>No Events Found</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default home;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100,
  },
  btn: {
    backgroundColor: "#ffffff",
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
    color: "#000000",
    fontWeight: "300",
    paddingVertical: 2,
    paddingHorizontal: 20,
  },
  noEventsText:{
    fontSize: 18,
    fontWeight: "700",
  },
  ViewContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mobileItemsContainer: {
    flexDirection: "column",
    width: "100%",
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
    // width: "100%",
    // height: "100%",
    justifyContent: "space-between",
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
});
