import { Redirect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,LogBox } from "react-native";
import { account, client } from "../appwrite";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserProvider } from "../store/store";
import Loading from "./Loading";
import { PaperProvider } from "react-native-paper";

export default function Page() {
  // const { user, setUser, logout } = useContext(UserContext);
 
  LogBox.ignoreAllLogs(true);

  const [userData, setUserData] = useState({});

  const [loading,setLoading] = useState(false);

  const router = useRouter();

  const userAccount = account.get();
  
  useEffect(() => {
    try {
      userAccount
        .then((result) => {
          setLoading(true)
          setUserData(result);
          setLoading(false);
        })
        .catch((error) => {
          // console.log("error1: " + error);
          setLoading(true);
          setUserData({});
          setLoading(false); 
          router.replace('/login') 
        });
    } catch (error) { 
      console.log("error123: " + error);  
      setUserData({});
    }
    // console.log("userData: " + userData!=null ? userData : "null");  
  },[loading,userAccount]);      
  

  return (  
    <PaperProvider>
      { !loading ? <Loading /> : (  
        userData!=null ? <Redirect href={"/home"} /> : <Redirect href={"/login"} /> 
      )}
      <StatusBar style="dark" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
