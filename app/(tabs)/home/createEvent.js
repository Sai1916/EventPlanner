import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { ID, databases } from "../../../appwrite";
import { useRouter } from "expo-router"; 
import { Octicons } from "react-native-vector-icons";

const createEvent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [capacity, setCapacity] = useState();

  const [modal,setModal] = useState(false); 

  const [message,setMesssage] = useState("");

  const router = useRouter();

  const number = 12;

  const idGenerator = (number) => {
    let text = "";
    let possibleString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < number; i++)
      text += possibleString.charAt(Math.floor(Math.random() * possibleString.length));
  
    return text;
  }

  console.log("idGenerator: ", idGenerator(number));

    const onSubmitEvent = () => {
        console.log("name: ", name);
        console.log("email: ", email);
        console.log("capacity: ", capacity);
        const addDocumentToDB = databases.createDocument(
            '647639e8382636fce548',
            '647639f9c81c54babcbc',
            ID.unique(),
            data = {  
                id: idGenerator(number),
                event_name: name,
                organizer_email: email,
                capacity: capacity, 
            }
        );

        addDocumentToDB.then((result) => {
            console.log("result: ", result);
            setName("");
            setEmail("");
            setCapacity("");
            // router.replace({pathname: '/home',params : { 
            //     modal: true,  
            //     message: `${result.event_name} Event Created Successfully`,
            // }});
            setMesssage(`${result.event_name} Event Created Successfully`);
            setModal(modal => !modal);
        }).catch((error) => {
            console.log("error: ", error);
        })

    }

  return (
    <View style={styles.container}>
      { modal && (
          <View style={styles.overlay}>
            <View style={styles.innerOverlay}>
              <Octicons name="issue-closed" size={40} color="green" />
              <Text style={styles.overlayText}>{message}</Text> 
              <Button style={styles.closeBtn} onPress={() => setModal(modal => !modal)} title="Close" />
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
  inputBox: {
    // borderRadius: 10,
    marginVertical: 20,
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
  btnText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
