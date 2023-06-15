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
import { ID, account, client } from "../../appwrite";
import bgImage from "../../assets/event-bgImage1.webp";
import { UserContext } from "../../store/store";
import { BlurView } from "expo-blur";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;


const signUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { setUser } = useContext(UserContext);

  // const {Login} = useContext(UserContext);

  // const onSubmitLogin = () => {
  //     if(!email){
  //         return Alert.alert("Please enter an email");
  //     }
  //     if(!password){
  //         return Alert.alert("Please enter a password");
  //     }
  //     console.log("email: " + email);
  //     console.log("password: " + password);
  //     account.createEmailSession(email, password);
  //     // router.push('/home');
  //     // Alert.alert("Login Successful");
  // }

  // console.log("user in login:- ",user)

  const onSignUp = async () => {
    if (!email) {
      return Alert.alert("Please enter an email");
    }
    if (!password) {
      return Alert.alert("Please enter a password");
    }
    if (!name) {
      return Alert.alert("Please enter your name");
    }

    console.log("name: " + name);
    console.log("email: " + email);
    console.log("password: " + password);
    await account.create(ID.unique(), email, password, name);
    return await account
      .createEmailSession(email, password)
      .then((res) => {
        console.log("result signup page: " + res);
        router.replace("/home");
      })
      .catch((error) => {
        console.log("error inside: " + error);
      });
  };

  return (
    <ImageBackground source={bgImage} style={styles.container} blurRadius={2}>
      <LinearGradient
        colors={["rgba(160,40,160,0.8)", "transparent", "rgba(0,0,0,0.7)"]}
        style={styles.background}
      />
      <BlurView style={styles.innerContainer} intensity={160}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(e) => setName(e)}
          style={styles.textInput}
          placeholderTextColor={"black"}
          cursorColor={"black"}
        />
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

        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.7}
          onPress={onSignUp}
        >
          <Text style={styles.btnText}>SignUp</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <Text>Already had an account?</Text>
          <Link href={"/login"}>
            <Text style={styles.signup}>Login</Text>
          </Link>
        </View>
        </BlurView>
    </ImageBackground>
  );
};

export default signUp;

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
  innerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: (width / 10) * 9.3,
    marginHorizontal: 10,
    paddingVertical: 40,
    borderRadius: 10,
    borderColor: "black",
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
