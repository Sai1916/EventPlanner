import {
  Alert,
  Button,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { account, client } from "../../appwrite";
import bgImage from "../../assets/event-bgImage1.webp";
import { BlurView } from "expo-blur";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const onLogin = async () => {
    if (!email) {
      return Alert.alert("Please enter an email");
    }
    if (!password) {
      return Alert.alert("Please enter a password");
    }
    // console.log("email: " + email);
    // console.log("password: " + password);

    return await account
      .createEmailSession(email, password)
      .then((result) => {
        const userAccount = account.get();
        userAccount
          .then(() => {
            router.replace("/home");
          })
          .catch((error) => {
            console.log("error 1st catch: " + error);
          });
      })
      .catch((error) => {
        console.log("error outer login catch: " + error);
        // setUser(null);
        // account.deleteSession('current');
        Alert.alert("Logged Out");
      });
  };

  return (
    <ImageBackground source={bgImage} style={styles.container} blurRadius={2}>
      <LinearGradient
        colors={["rgba(160,40,160,0.8)", "transparent", "rgba(0,0,0,0.7)"]}
        style={styles.background}
      />
      {/* <LinearGradient colors={["rgba(225,225,225,0.9)", "transparent", "rgba(225,225,225,0.9)"]}> */}
      <BlurView style={styles.innerContainer} intensity={120}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(e) => setEmail(e)}
          style={styles.textInput}
          placeholderTextColor={"black"}
          cursorColor={"black"}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(e) => setPassword(e)}
          style={styles.textInput}
          placeholderTextColor={"black"}
          cursorColor={"black"}
          secureTextEntry={true}
        />
        {/* <Button title='Login' onPress={onSubmitLogin} style={styles.btn}/> */}
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.7}
          onPress={onLogin}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <Text>Forgot Password?</Text>
          <Link href={"/signUp"}>
            <Text style={styles.signup}>Sign Up</Text>
          </Link>
        </View>
      {/* </LinearGradient> */}  
      </BlurView> 
    </ImageBackground>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    resizeMode: "cover",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  innerContainer:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: width/10*9.3,
    marginHorizontal:10,
    paddingVertical: 40,
    borderRadius: 10,
    borderColor: 'black', 
    // borderWidth: 1,
  },
  textInput: {
    // marginHorizontal: 20,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    width: "94%",
    // backgroundColor: 'skyblue',
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
    width: "100%",
  },
  signup: {
    fontSize: 16,
    fontWeight: "500",
    color: "#9041c2",
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 10,
    width: "50%",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
