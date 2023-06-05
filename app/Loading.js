import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {loadingImage} from '../assets/loading.png'
import { SafeAreaView } from 'react-native-safe-area-context'

const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={loadingImage} style={styles.loading}>
        <Text>Loading</Text>  
      </ImageBackground>
    </SafeAreaView>
  )
}  

export default Loading

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        // backgroundColor: 'skyblue',
        alignItems: 'center',
    },
    loading:{
      width: 300,
      height: '80%',
      resizeMode: 'cover',
    }

})