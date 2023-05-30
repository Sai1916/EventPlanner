import { Tabs } from "expo-router"
import {Feather,MaterialIcons,FontAwesome5} from 'react-native-vector-icons'


export default () =>  {
    return <Tabs screenOptions={{
        tabBarInactiveTintColor: '#469d98',
        tabBarActiveTintColor: '#000000',
        tabBarStyle:{
            // alignItems: 'center',
            // justifyContent: 'center',
            // paddingVertical: 10,
            height: 50,
        },
        // tabBarLabelPosition: 'below-icon',
        tabBarShowLabel: false,
        // tabBarStyle: {backgroundColor: '#e09ad3'},
    }}>
        <Tabs.Screen name="home" options={{
            tabBarIcon : ({focused}) => <Feather name="home" color={focused ? '#000000' : '#469d98'} size={26}/>, 
            headerShadowVisible: true,
            // headerStyle: {backgroundColor: '#51bfb9'},
            headerStyle: {backgroundColor: '#0d9a60'},
            headerTitle: 'Home',
            headerTitleStyle: {color: '#fff'},
        }} />
        <Tabs.Screen name="myEvents" options={{
            // headerShown: false,
            tabBarIcon : ({focused}) => <MaterialIcons name="event" color={focused ? '#000000' : '#469d98'} size={26}/>,
            headerTitle: 'My Events'
        }} />
        <Tabs.Screen name="profile" options={{
            headerShown: false,
            tabBarIcon : ({focused}) => <FontAwesome5 name="user" color={focused ? '#000000' : '#469d98'} size={22}/>,
            tabBarLabel: 'Profile'
        }} />
    </Tabs>    
}