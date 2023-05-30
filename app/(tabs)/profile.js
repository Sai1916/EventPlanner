import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { account } from '../../appwrite';
import { Redirect } from 'expo-router';

const profile = () => {
  
  const logout = async () => {
    
    const sessions = account.listSessions();
    console.log("session list:- ",sessions);  
    await account.deleteSession('current');
    // await account.deleteSessions(); 
    // <Redirect href={"/login"} />
  }

  return (
    <View>
      <Text>profile</Text>
      <Text>profile</Text>
      <Text>profile</Text>
      <Text>profile</Text>
      <TouchableOpacity onPress={logout}><Text>Logout</Text></TouchableOpacity>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})