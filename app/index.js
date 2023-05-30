import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { account, client } from "../appwrite";
import { useEffect, useState } from "react";

export default function Page() {
  
  // const user = client.getAccount();
  const [user,setUser] = useState(null);

    // client.getAccount().then((result) => {
    //   console.log("result: " + result);
    //   user = result;
    // }).catch((error) => {
    //   console.log("error: " + error);
    // });

    // console.log("user: " + client.getAccount());  

    useEffect(() => {

      const userAccount = account.get();

      if(userAccount){
        setUser(userAccount);
      }
      else{
        setUser(null); 
        account.deleteSessions();
      }
    },[]);

    console.log("user: " + user!=null ? user : '');

  return (
    <>   
    {user ?        
      <View style={styles.container}>   
        <View style={styles.main}>
          <Text style={styles.title}>Hello World</Text>
          <Text style={styles.subtitle}>This is the first page of your app.</Text>
          <Redirect href={"/home"} />
        </View>
      </View> :
      <Redirect href={"/login"} />   
    }
      <StatusBar style="auto" />
    </>
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
