import { Account, Avatars, Client, Databases, ID, Storage } from 'appwrite'; 
import {APPWRITE_API, APPWRITE_PROJECT_ID} from '@env'

const client = new Client();  


client
.setEndpoint(APPWRITE_API) // Your API Endpoint  
.setProject(APPWRITE_PROJECT_ID) // Your project ID); 
   
const account = new Account(client);  

const avatars = new Avatars(client);

const databases = new Databases(client);

const storage = new Storage(client);
  
export { client, databases, account, avatars, storage, ID };