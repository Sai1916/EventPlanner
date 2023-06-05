import { Redirect, Tabs, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Feather,
  MaterialIcons,
  FontAwesome5,
} from "react-native-vector-icons";
import { account } from "../../appwrite";

export default () => {
  const [user, setUser] = useState({});
  
  const router = useRouter();

  useEffect(() => {
    try {
      const userAccount = account.get();
      userAccount 
        .then((result) => {
        //   console.log("result1: " + result);
          setUser(result);
        })
        .catch((error) => {
          setUser({});
          router.replace("/login");
        });
    } catch (error) {
      console.log("error123: " + error);
      setUser({});
    }
  },[user]);

  return (
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: "#469d98",
          tabBarActiveTintColor: "#000000",
          tabBarStyle: {
            // alignItems: 'center',
            // justifyContent: 'center',
            // paddingVertical: 10,
            height: 50,
          },
          // tabBarLabelPosition: 'below-icon',
          tabBarShowLabel: false,
          // tabBarStyle: {backgroundColor: '#e09ad3'},
        }}
        initialRouteName="home"
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="home"
                color={focused ? "#000000" : "#469d98"}
                size={26}
              />
            ),
            headerShadowVisible: true,
            // headerStyle: {backgroundColor: '#51bfb9'},
            headerStyle: { backgroundColor: "#0d9a60" },
            headerTitle: "Home",
            headerTitleStyle: { color: "#fff" },
          }}
        />
        <Tabs.Screen
          name="myEvents"
          options={{
            // headerShown: false,
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="event"
                color={focused ? "#000000" : "#469d98"}
                size={26}
              />
            ),
            headerTitle: "My Events",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="user"
                color={focused ? "#000000" : "#469d98"}
                size={22}
              />
            ),
            tabBarLabel: "Profile",
          }}
        />
      </Tabs>
  )
};
