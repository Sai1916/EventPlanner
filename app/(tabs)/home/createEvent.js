import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { ID, databases, storage } from "../../../appwrite";
import { useRouter } from "expo-router";
import { Octicons } from "react-native-vector-icons";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import axios from "axios";
import {
  APPWRITE_API,
  APPWRITE_BUCKET_ID,
  APPWRITE_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_PROJECT_ID,
} from "@env";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const createEvent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [capacity, setCapacity] = useState();
  const [address, setAddress] = useState("");

  const [modal, setModal] = useState(false);

  const [message, setMesssage] = useState("");

  const router = useRouter();

  const number = 12;

  const [dateValue, setDateValue] = useState(new Date());
  const [timeValue, setTimeValue] = useState(new Date());

  const idGenerator = (number) => {
    let text = "";
    // let possibleString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let possibleString = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < number; i++)
      text += possibleString.charAt(
        Math.floor(Math.random() * possibleString.length)
      );

    return text;
  };

  // console.log("idGenerator: ", idGenerator(number));

  const onSubmitEvent = () => {
    if (!email) {
      return Alert.alert("Please enter an email");
    }
    if (!name) {
      return Alert.alert("Please enter a name");
    }
    if (!capacity) {
      return Alert.alert("Please enter event capacity");
    }
    if (!description) {
      return Alert.alert("Please enter event description");
    }
    if (!address) {
      return Alert.alert("Please enter valid address");
    }
    // if (!image) {
    //   return Alert.alert("Please upload an image");
    // }
    console.log("name: ", name);
    console.log("email: ", email);
    console.log("capacity: ", capacity);
    console.log("address: ", address);

    const finalDateTime = dateValue.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    console.log("finalDateTime: ", finalDateTime);

    const addDocumentToDB = databases.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      ID.unique(),
      (data = {
        id: idGenerator(number),
        event_name: name,
        organizer_email: email,
        capacity: capacity,
        dateTime: finalDateTime,
        description: description,
        address: address,
      })
    );

    addDocumentToDB
      .then((result) => {
        console.log("result: ", result);
        setName("");
        setEmail("");
        setCapacity("");
        setDescription("");
        setAddress("");
        setDateValue(new Date());
        setTimeValue(new Date().getTime());

        // var data = Platform.OS === 'web'  ? new File([image],imageResult.name,{type: imageResult.mimeType}) : new File([image], imageResult.name, {type: imageResult.mimeType});

        // const imageFile = new Blob([image], {type: imageResult.mimeType});
        // console.log("imageFile: ", imageFile);

        // const file = new File([image], imageResult.name, {type: imageResult.mimeType});
        // console.log("file: ", file);

        if (image && imageResult) {
          if (Platform.OS === "web") {
            const uploadFile = storage.createFile(
              APPWRITE_BUCKET_ID,
              result.$id,
              imageResult
            );
            console.log("uploadFile: ", uploadFile);

            uploadFile
              .then((res) => {
                console.log("file upload res: ", res);
                setMesssage(`${result.event_name} Event Created Successfully`);
                setModal((modal) => !modal);
              })
              .catch((error) => {
                console.log("error in file uploading: ", error);
              });
          } else {
            const axiosUpload = () => {
              const file = new File([image], imageResult.name, {
                type: imageResult.mimeType,
              });
              let formData = new FormData();
              formData.append("fileId", result.$id);
              formData.append("file", file);
              console.log("formData", formData);
              axios({
                url: `${APPWRITE_API}/storage/buckets/${APPWRITE_BUCKET_ID}/files/`,
                method: "POST",
                data: formData,
                headers: {
                  "content-type": "multipart/form-data",
                  "X-Appwrite-Project": APPWRITE_PROJECT_ID,
                  "X-Appwrite-Response-Format": "0.15.0",
                  "x-sdk-version": "appwrite:web:11.0.0",
                },
              })
                .then(function (response) {
                  console.log("response :", response.json());
                  setImage(null);
                  setImageResult(null);
                  setMesssage(
                    `${result.event_name} Event Created Successfully`
                  );
                  setModal((modal) => !modal);
                })
                .catch(function (error) {
                  console.log("error from image :", error);
                });
            };

            // axiosUpload();

            // fetch

            //   const file = new File([image], imageResult.name, {
            //     type: imageResult.mimeType,
            //   });
            //   let formData = new FormData();
            //   formData.append("fileId", result.$id);
            //   formData.append("file", file);
            //   console.log("formData", formData);

            //   fetch(`${APPWRITE_API}/storage/buckets/${APPWRITE_BUCKET_ID}/files/`, {
            //     method: "POST",
            //     headers: {
            //         "content-type": "multipart/form-data",
            //         "X-Appwrite-Project": APPWRITE_PROJECT_ID,
            //         "x-sdk-version": "appwrite:web:11.0.0",
            //     },
            //     body: formData,
            //     credentials: "include",
            // });

            /// xhr request
            const xhrRequest = async () => {
              let formData = new FormData();
              formData.append("fileId", "unique()");
              formData.append("file", {
                uri: image,
                name: imageResult.name,
                type: imageResult.mimeType,
              });

              console.log("formData", formData);
              await sendXmlHttpRequest(formData).then(
                function (response) {
                  console.log("response", response); // Success
                  setImage(null);
                  setImageResult(null);
                  setMesssage(
                    `${result.event_name} Event Created Successfully`
                  );
                  setModal((modal) => !modal);
                },
                function (error) {
                  console.log("error in uploading...", error); // Failure
                }
              );
            };

            function sendXmlHttpRequest(data) {
              const xhr = new XMLHttpRequest();

              return new Promise((resolve, reject) => {
                xhr.onreadystatechange = (e) => {
                  if (xhr.readyState !== 4) {
                    return;
                  }
                  console.log("xhr.status", xhr);

                  if (xhr.status === 201) {
                    resolve(JSON.parse(xhr.response));
                  } else {
                    reject("Request Failed");
                  }
                };

                xhr.open(
                  "POST",
                  `${APPWRITE_API}/storage/buckets/${APPWRITE_BUCKET_ID}/files/`
                );
                xhr.withCredentials = true;
                xhr.setRequestHeader("X-Appwrite-Project", APPWRITE_PROJECT_ID);
                xhr.setRequestHeader("X-Appwrite-Response-Format", "0.15.0");
                xhr.setRequestHeader("x-sdk-version", "appwrite:web:11.0.0");
                xhr.send(data);
              });
            }

            xhrRequest();
          }
        }
        else{
          setMesssage(`${result.event_name} Event Created Successfully`);
          setModal((modal) => !modal);
        }

        // const  uploadFile = storage.createFile(APPWRITE_BUCKET_ID, result.$id, Platform.OS === 'web' ? imageResult: file );
        // console.log("uploadFile: ", uploadFile);

        // uploadFile.then((res) => {
        //     console.log("file upload res: ", res);
        //     setMesssage(`${result.event_name} Event Created Successfully`);
        //     setModal(modal => !modal);
        //   }).catch((error) => {
        //     console.log("error in file uploading: ", error);
        //   })

        // setMesssage(`${result.event_name} Event Created Successfully`);
        // setModal(modal => !modal);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const [image, setImage] = useState(null);
  const [imageResult, setImageResult] = useState(null);

  const pickImage = async () => {
    ///// document picker code

    const resultDocument = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true,
    });
    // const resultDocument = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: false,
    //   quality: 1,
    // })

    // if (!resultDocument.canceled) {
    //   setImage(resultDocument.assets[0].uri);
    //   setImageResult(resultDocument.assets[0]);
    // }

    console.log("resultDocument: ", resultDocument);

    if (resultDocument.type === "success") {
      if (Platform.OS === "web") {
        setImage(resultDocument.uri);
        setImageResult(resultDocument.file);
      } else if (Platform.OS === "android" || Platform.OS === "ios") {
        setImage(resultDocument.uri);
        setImageResult(resultDocument);
      }
    }
  };

  const onDateTimeSelectPress = (type) => {
    console.log("type: ", type);
    DateTimePickerAndroid.open({
      mode: type === "date" ? "date" : "time",
      value: new Date(),
      timeZoneOffsetInMinutes: 330,
      is24Hour: true,
      onChange: (e, date) => {
        console.log("e: ", e);
        console.log("date: ", date);
        if (type === "date") {
          setDateValue(new Date(date.getUTCDate()));
        } else {
          dateValue.setTime(date.getTime());
          // setTimeValue(date.getHours()+":"+date.getMinutes());
        }
      },
    });

    // console.log("dateValue: ", dateValue);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <TextInput
        label="Event Name"
        mode="outlined"
        value={name}
        onChangeText={(text) => setName(text)}
        // onBlur={() => console.log('blur')}
        style={styles.inputBox}
      />
      <TextInput
        label="Event Description"
        mode="outlined"
        value={description}
        onChangeText={(val) => setDescription(val)}
        // onBlur={() => console.log('blur')}
        style={styles.inputBox}
      />
      <TextInput
        label="Email of Event Organizer"
        mode="outlined"
        value={email}
        onChangeText={(e) => setEmail(e)}
        // onBlur={() => console.log('blur')}
        keyboardType="email-address"
        style={styles.inputBox}
      />
      <TextInput
        label="Event Capacity"
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
        onChangeText={(val) => setAddress(val)}
        style={styles.inputBox}
      />

      {/* {image && <Image source={{ uri: image }} style={{ width: "96%", height: 200, resizeMode: 'contain', borderRadius: 10 }} />} */}
      <Button icon="image" mode="elevated" onPress={pickImage}>
        Upload
      </Button>

      <TouchableOpacity
        style={styles.dateBtn}
        activeOpacity={0.7}
        onPress={() => onDateTimeSelectPress("date")}
      >
        <Text style={styles.btnText}>Pick a Date</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.dateBtn}
        activeOpacity={0.7}
        onPress={() => onDateTimeSelectPress("time")}
      >
        <Text style={styles.btnText}>Pick a Time</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.7}
        onPress={onSubmitEvent}
      >
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default createEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    flex: 1,
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
  },
  closeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "80%",
  },
  inputBox: {
    // borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
    width: "92%",
    backgroundColor: "#ffffff",
  },
  btn: {
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 10,
    alignItems: "center",
  },
  dateBtn: {
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 10,
    alignItems: "center",
  },
  btnText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
