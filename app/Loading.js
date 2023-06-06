import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import loadingImage from '../assets/loading.png'
import { SafeAreaView } from 'react-native-safe-area-context'

const width = Dimensions.get("screen").width;


const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={loadingImage} style={styles.loading} />
      <Text style={styles.text}>Loading....</Text>
    </SafeAreaView>
  )
}  

export default Loading

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading:{
      width: width,
      height: '80%',
      resizeMode: 'contain',
    },
    text: {
      fontSize: 20,
      fontWeight: 400
    }
})