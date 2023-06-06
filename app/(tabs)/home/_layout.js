import { Stack } from "expo-router"

export default () => {
    return <Stack initialRouteName="createEvent">
        <Stack.Screen name="index" options={{ 
            headerShadowVisible: true,
            // headerStyle: {backgroundColor: '#51bfb9'},
            headerStyle: { backgroundColor: "#0d9a60" },
            headerTitle: "Home",
            headerTitleStyle: { color: "#fff" },
        }}/>
        <Stack.Screen name="createEvent" options={{
            // presentation : 'modal',
            // gestureEnabled: true,
            // gestureDirection: 'horizontal'  
            headerTitle: 'Create an Event'
        }}/>
    </Stack>
}