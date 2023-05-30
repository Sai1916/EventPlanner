import { Alert, Button, Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { account, client } from '../../appwrite';
import {bgImage} from '../../assets/event-bgImage1.webp';


const height = Dimensions.get('screen').height;

const login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitLogin = () => {
        if(!email){
            return Alert.alert("Please enter an email");
        }
        if(!password){
            return Alert.alert("Please enter a password");
        }
        console.log("email: " + email);
        console.log("password: " + password);
        account.createEmailSession(email, password);
        Alert.alert("Login Successful");
    }

  return (
    <ImageBackground source={bgImage} style={styles.container} blurRadius={2}>    
        <LinearGradient
            colors={['rgba(160,40,160,0.8)', 'transparent','rgba(0,0,0,0.7)' ]} 
            style={styles.background}
        />
      <TextInput placeholder='Email' value={email} onChangeText={e => setEmail(e)} style={styles.textInput} placeholderTextColor={'black'} cursorColor={'black'}/>
      <TextInput placeholder='Password' value={password} onChangeText={e => setPassword(e)} style={styles.textInput} placeholderTextColor={'black'} cursorColor={'black'}/>
      {/* <Button title='Login' onPress={onSubmitLogin} style={styles.btn}/> */}
      <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={onSubmitLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Text>Forgot Password?</Text>
        <Link href={'/signUp'}>
            <Text style={styles.signup}>Sign Up</Text>
        </Link>
      </View>

    </ImageBackground>
  )
}

export default login

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        resizeMode: 'cover',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height,
      },
    textInput: {
        // marginHorizontal: 20,
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 16,
        width: '94%',
        // backgroundColor: 'skyblue',
    },
    bottomContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 30,
        width: '100%',
    },
    signup:{
        fontSize: 16,
        fontWeight: '500',
        color: '#9041c2',
    },
    btn:{
        alignItems: 'center',
        backgroundColor: '#000000',
        borderRadius: 10,
        width: '50%',
    },
    btnText:{
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    }
})