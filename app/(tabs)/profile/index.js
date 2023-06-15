import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { account, avatars } from "../../../appwrite";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;


const profile = () => {

  const router = useRouter();

  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);

  const [loading,setLoading] = useState(false);
  const [btnLoading,setBtnLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {  
      setLoading(true);
      const user = await account.get();
      try{
        console.log("user in profile")
       setUser(user);
        setLoading(false);
      }catch(error) {
        console.log("error in profile catch: " + error);
        router.replace('/login');
      }
    };
    getUser();
  },[]);

  useEffect(() => {
    if (user!=null) {
      const getImage = () => {
        const image = avatars.getInitials(user.name,100,100);  
        setImage(image);
      };
      getImage(); 
    } 
  },[user]);  

  const Logout = async () => {  
    setBtnLoading(load => !load);
    return await account.deleteSession('current').then((result) => {
      router.replace('/login'); 
    }).catch((error) => {
      console.log("error in logout: " + error); 
    })  
  }
  const onEditPress = () => {
    // router.push("/profile/editProfile");
  }

  return (
    <View style={styles.container}>
      {!loading ? (
        <>
          <Image source={{ uri: image?.href }} style={styles.image} />
          {/* <TouchableOpacity style={styles.editBtn} activeOpacity={0.7} onPress={onEditPress}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>  */}
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.textDisabled}> {user.email} </Text>
          <Text style={styles.textDisabled}> {user.phone ? user.phone : 'Phome Number not updated'} </Text>
        {/* <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={Logout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>  */}
        <Button mode="contained" dark={true} labelStyle={styles.btnText} loading={btnLoading} style={styles.btn} onPress={Logout}>Logout</Button>
        </>   
        ) : <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Please wait your profile is loading....</Text>
      </View>}
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'space-around',
    alignItems: "center",
    flex:1,
    backgroundColor: "#ffffff",
    paddingTop: 40,
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 6,
    position: "absolute",
    bottom: 30,
    fontSize: 18,
  }, 
  editBtn: {
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 6,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff",
    // paddingHorizontal: 20,
    // paddingVertical: 8,
  },
  editBtnText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
    marginVertical: 30,
  },
  textDisabled: {
    // marginHorizontal: 20,
    paddingHorizontal: 8,
    paddingVertical: 14,
    borderWidth: 1,
    // borderColor: "blue",
    borderRadius: 10,
    marginVertical: 20,
    fontSize: 16,
    width: "92%",
    backgroundColor: '#eeeeee',
  },
  userName:{
    fontSize: 20,
    fontWeight: "500",
    fontFamily: 'sans-serif',
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
    textAlign: "center",
  },
});
