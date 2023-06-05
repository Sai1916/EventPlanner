import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { account } from '../../appwrite';
import { Redirect, useRouter } from 'expo-router';
import { UserContext } from '../../store/store';

const profile = () => {
  
  // const {setUser} = useContext(UserContext);

  const router = useRouter();


  const [user,setUser] = useState({});

  // useEffect(() => {
  //     try{
  //         const userAccount = account.get();
  //         // console.log("userAccount: " + userAccount);
  //         userAccount.then((result) => {
  //           console.log("result profile: " + result.email);
  //           setUser(result);
  //         }).catch((err) => {console.log("error: " + err);
  //           // setUser(null);
  //           router.replace('/login');
  //       });
  //     }
  //     catch(error){
  //         console.log("error: " + error);
  //     }
  // },[])

  const Logout = async () => { 
    return await account.deleteSession('current');
  }
 
  return (
    <View>
      <Text>profile</Text>
      <Text>profile</Text>
      <Text>profile</Text> 
      <Text>profile</Text>  
      {/* <Text>{user ? user.email : 'Logged OUt' }</Text>   */}

      <TouchableOpacity onPress={Logout}><Text>Logout</Text></TouchableOpacity>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})