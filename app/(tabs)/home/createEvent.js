import { Alert, Image, StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { ID, databases, storage } from "../../../appwrite";
import { useRouter } from "expo-router"; 
import { Octicons } from "react-native-vector-icons";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { InputFile } from 'appwrite';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const createEvent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [capacity, setCapacity] = useState();
  const [address, setAddress] = useState("");

  const [modal,setModal] = useState(false); 

  const [message,setMesssage] = useState("");

  const router = useRouter();

  const number = 12;

  const [dateValue,setDateValue] = useState(new Date());
  const [timeValue,setTimeValue] = useState(new Date());

  const idGenerator = (number) => {
    let text = "";
    // let possibleString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let possibleString = "abcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < number; i++)
      text += possibleString.charAt(Math.floor(Math.random() * possibleString.length));
  
    return text;
  }

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
          hour: '2-digit',
          minute: '2-digit', 
          hour12: true
        })

        console.log("finalDateTime: ", finalDateTime);

        const addDocumentToDB = databases.createDocument(
            '647639e8382636fce548',
            '647639f9c81c54babcbc',
            ID.unique(),
            data = {  
                id: idGenerator(number),
                event_name: name,
                organizer_email: email,
                capacity: capacity, 
                dateTime: finalDateTime,
                description: description,
                address: address,
            }
        );

        addDocumentToDB.then((result) => {
            console.log("result: ", result);
            setName("");
            setEmail("");
            setCapacity("");
            setDescription("");
            setAddress("");
            setDateValue(new Date());
            setTimeValue(new Date().getTime());
            setImage(null);
            // const  uploadFile = storage.createFile('64803265c286edb75d02', result.$id, new File(image,image.split('/')[-1]));  

            // const blob = new Blob([JSON.stringify(imageResult, null, 2)], {
            //   // type: imageResult.mimeType, 
            //   type: "image/jpeg",  
            // });

            // var data = Platform.OS === 'web'  ? new File([blob],imageResult.name,{type: imageResult.mimeType}) : InputFile.fromBlob(blob,imageResult.name,imageResult.mimeType);

            // const  uploadFile = storage.createFile('64803265c286edb75d02', result.$id, data);   
            // console.log("uploadFile: ", uploadFile);
            

            // uploadFile.then((res) => {
            //     console.log("file upload res: ", res); 
            //     setMesssage(`${result.event_name} Event Created Successfully`);
            //     setModal(modal => !modal);
            //   }).catch((error) => {
            //     console.log("error in file uploading: ", error);
            //   })


              setMesssage(`${result.event_name} Event Created Successfully`);
              setModal(modal => !modal);

        }).catch((error) => {
            console.log("error: ", error);
        })

    }

    const [image, setImage] = useState(null);
    const [imageResult,setImageResult] = useState(null)

    const pickImage = async () => {
      
      ///// document picker code

      const resultDocument = await DocumentPicker.getDocumentAsync({type: 'image/*',copyToCacheDirectory: true});
      console.log("resultDocument: ", resultDocument);

      if(resultDocument.type === 'success'){
        setImage(resultDocument.uri);
        setImageResult(resultDocument);
      }
    };

    const onDateTimeSelectPress = (type) => {
      console.log("type: ", type);
      DateTimePickerAndroid.open({
        mode: type === "date" ? 'date' : 'time',        
        value: new Date(),
        timeZoneOffsetInMinutes : 330,
        is24Hour: true,  
        onChange: (e,date) => {
          console.log("e: ", e);
          console.log("date: ", date);
          if(type === 'date'){
            setDateValue(new Date(date.getUTCDate()));
          }else{
            dateValue.setTime(date.getTime());
            // setTimeValue(date.getHours()+":"+date.getMinutes());  
          }
        },
      })
      
      // console.log("dateValue: ", dateValue);
      
    }


  return (
    <View style={styles.container}>
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

      {/* {image && <Image source={{ uri: image }} style={{ width: "96%", height: 200, resizeMode: 'contain', borderRadius: 10 }} />}
      <Button icon="image" mode="elevated" onPress={pickImage}>
        Upload
      </Button> */}

      <TouchableOpacity style={styles.dateBtn} activeOpacity={0.7} onPress={() => onDateTimeSelectPress('date')}>
        <Text style={styles.btnText}>Pick a Date</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.dateBtn} activeOpacity={0.7} onPress={() => onDateTimeSelectPress('time')}>
        <Text style={styles.btnText}>Pick a Time</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={onSubmitEvent}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default createEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  overlay:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText:{
    fontSize: 20,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  innerOverlay:{
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center', 
    justifyContent: 'space-around',
    height: 200,
    width: width*0.9,
  },
  closeBtn:{
    paddingHorizontal: 10,
    paddingVertical: 5,
    width:'80%',
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
