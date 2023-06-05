import { createContext, useEffect, useState } from "react";
import { account } from "../appwrite";
import { Alert } from "react-native";


const UserContext = createContext({});

const UserProvider = ({children}) => {
    const [user,setUser] = useState(null);
  
    useEffect(() => {
        
        // if(user){
        //     const userAccount = account.get();
        //     userAccount.then((result) => {
        //         console.log("result store: " + result);
        //         setUser(result);  
        //     }).catch((error) => {
        //         console.log("error: " + error); 
        //         setUser(null);
        //         account.deleteSession('current');
        //     })  
        // }

        try{
            const userAccount = account.get();
            console.log("userAccount: " + userAccount);
            setUser(userAccount);
        }
        catch(error){
            console.log("error: " + error);
        }


    },[]);

    const Login = async (email,password) => {  

        try{
            console.log("email store: " + email);
            console.log("password store: " + password);
        }
        catch(error){
            console.log("error: " + error);
        }

       
        //  await account.createEmailSession(email, password)
        // .then((result) => {
        //     console.log("result login: " + result);
        //     setUser(result);
        // }).catch((error) => {  
        //     console.log("error: " + error);    
        //     setUser(null);  
        //     account.deleteSession('current');
        //     Alert.alert("Logged Out");
        // }); 
        
    }

    const logout = async () => {
        console.log("logout");
         await account.deleteSession('current');
    }

    return (
        <UserContext.Provider value={{user,setUser,logout,Login}}>
            {children} 
        </UserContext.Provider>
    )
}
  
export { UserContext, UserProvider}