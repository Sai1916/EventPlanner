import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const editProfile = () => {
  return (
    <View style={styles.container}>
      <Text>editProfile</Text>
    </View>
  )
}

export default editProfile

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  }
})