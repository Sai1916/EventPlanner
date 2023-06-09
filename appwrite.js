import { Account, Avatars, Client, Databases, ID, Storage } from 'appwrite';

const client = new Client();


client
.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint  
.setProject('647615fed2e27f0b2a49') // Your project ID);

const account = new Account(client);

const avatars = new Avatars(client);

const databases = new Databases(client);

const storage = new Storage(client);
  
export { client, databases, account, avatars, storage, ID };