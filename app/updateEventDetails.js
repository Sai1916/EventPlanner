import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Octicons } from "react-native-vector-icons";
import { databases } from "../appwrite";
import { APPWRITE_COLLECTION_ID, APPWRITE_DATABASE_ID } from '@env';  

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const updateEventDetails = () => {
  const { data } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [capacity, setCapacity] = useState();
  const [address, setAddress] = useState("");

  const navigation = useNavigation();

  const router = useRouter();

  const [btnLoading,setBtnLoading] = useState(false);


  console.log("data updated: ", data);

  const [modal, setModal] = useState(false);
  const [message, setMesssage] = useState("");

  useEffect(() => {
    setName(data.event_name);
    setEmail(data.organizer_email);
    setCapacity("" + data.capacity);
    setDescription(data.description);
    setAddress(data.address);
  }, []);

  const onSubmit = () => {
    console.log("onSubmit");

    setBtnLoading(load => !load);

    if (
      data.event_name == name &&
      data.organizer_email == email &&
      data.description == description &&
      data.capacity == Number(capacity) &&
      data.address == address
    ) {
      setMesssage("No Changes made");
      setModal((modal) => !modal);
      console.log("in if ");
    } else {
      console.log("in else ");
      const updateDetails = databases.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        data.$id,  
        {
          event_name: name,
          organizer_email: email,
          description: description,
          capacity: Number(capacity),
          address: address,
        }
      );
      updateDetails
        .then((result) => {
          console.log("result of update: " + result);
          setMesssage("Event details Updated Successfully");
          setModal((modal) => !modal);
          setBtnLoading(load => !load);
        })
        .catch((error) => {
          console.log("error in details update: " + error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {modal && (
        <View style={styles.overlay}>
          <View style={styles.innerOverlay}>
            <Octicons name="issue-closed" size={40} color="green" />
            <Text style={styles.overlayText}>{message}</Text>
            <Button
              mode="contained-tonal"
              style={styles.closeBtn}
              onPress={() => setModal((modal) => !modal)}
            >
              Close
            </Button>
          </View>
        </View>
      )}
      <TouchableOpacity styles={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="ios-arrow-back-circle-outline" size={32} />
      </TouchableOpacity>
      <Text style={styles.heading}>Update your Event Details</Text>
      <TextInput
        label="Name of the Event"
        mode="outlined"
        value={name}
        onChangeText={(e) => setName(e)}
        style={styles.inputBox}
      />
      <TextInput
        label="Organizer Email"
        mode="outlined"
        value={email}
        onChangeText={(e) => setEmail(e)}
        keyboardType="email-address"
        style={styles.inputBox}
      />
      <TextInput
        label="Description of the Event"
        mode="outlined"
        value={description}
        onChangeText={(e) => setDescription(e)}
        style={styles.inputBox}
      />
      <TextInput
        label="Capacity of the Event"
        mode="outlined"
        value={capacity}
        onChangeText={(val) => setCapacity(val)}
        keyboardType="numeric"
        style={styles.inputBox}
      />
      <TextInput
        label="Event Address"
        mode="outlined"
        value={address}
        onChangeText={(e) => setAddress(e)}
        style={styles.inputBox}
      />

      {/* <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.7}
        onPress={onSubmit}
      >
        <Text style={styles.btnText}>Update Details</Text>
      </TouchableOpacity> */}
      <Button mode="contained" dark={true} labelStyle={styles.btnText} loading={btnLoading} style={styles.btn} onPress={onSubmit}>Update Details</Button>

    </SafeAreaView>
  );
};

export default updateEventDetails;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: width,
    height: height,
    backgroundColor: "#fff",
    // alignItems: "center",
    // position: "relative",
  },
  backBtn: {
    backgroundColor: 'blue',
    position:"absolute",
    marginTop:40,
    // zIndex:100,
    marginLeft:30
  },
  heading: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  inputBox: {
    // borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
    alignSelf: "center",
    width: "92%",
    backgroundColor: "#ffffff",
  },
  btn: {
    alignItems: "center",
    // backgroundColor: "#000000",
    borderRadius: 26,
    width: "50%",
    alignSelf: "center",
    paddingVertical: 5,
    marginVertical: 20,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    // paddingHorizontal: 20,
    // paddingVertical: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayText: {
    fontSize: 20,
    fontWeight: "bold",
    flexWrap: "wrap",
    textAlign: "center",
  },
  innerOverlay: {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-around",
    height: 200,
    width: width * 0.9,
    // paddingHorizontal: 20,
  },
  closeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "60%",
  },
});
