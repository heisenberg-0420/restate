import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import { makeRedirectUri } from "expo-auth-session";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
    platform: 'com.dopeman.restate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
    try{
        const deepLink = new URL(makeRedirectUri({preferLocalhost: false}));
        if(!deepLink.hostname){
            deepLink.hostname = 'localhost';
        }
        const scheme = `${deepLink.protocol}//`;

        const loginUrl = await account.createOAuth2Token(
            OAuthProvider.Google,
            `${deepLink}`,
            `${deepLink}`,
        );

        if(!loginUrl) throw new Error('Create OAuth2 token failed');

        const browserResult = await openAuthSessionAsync(
            `${loginUrl}`,
            scheme
        );
        if (browserResult.type !== 'success') throw new Error('Create OAuth2 token failed');

        const url = new URL(browserResult.url);

        const secret = url.searchParams.get('secret');
        const userId = url.searchParams.get('userId');
        if(!secret || !userId) throw new Error('Create OAuth2 token failed');

        const session = await account.createSession(userId, secret);
        if(!session) throw new Error("Failed to create a session");

        return true;
    } catch (error) {
        return false;
    }
}

export async function logout() {
   try{
       await account.deleteSession('current');
       return true;
   } catch (error) {
       return false;
   }
}

export async function getCurrentUser () {
    try{
        const response = await account.get();

        if(response.$id) {
            const userAvatar = avatar.getInitials(response.name);
            return {
                ...response,
                avatar: userAvatar.toString()
            };        
        }
    } catch (error) {
       return false;
    }
};
