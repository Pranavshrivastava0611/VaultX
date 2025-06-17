
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";
import "react-native-get-random-values";
import { Buffer } from "buffer";
global.Buffer = Buffer;
import { getItemAsync } from "expo-secure-store";
import { get } from "http";


export default function Index() {
  const router = useRouter();
  
  useEffect(()=>{
        const checkOnboarding = async ()=>{
            const password = await getItemAsync('wallet_pin');
            const seed = await getItemAsync('wallet_mnemonic');
            const LastSignedIn = await getItemAsync('lastSignedIn');

            if (!password || !seed || password==null) {
            router.replace('/(auth)/onboarding');
            return ;
      } 
            const now = Date.now();
            const last = Number(LastSignedIn);
            if (isNaN(last) || now - last > 60000) {
           router.replace("/(auth)/login");
    } else {
      router.replace("/(tabs)");
    }
      }

      checkOnboarding();
    },[]);
    
  return (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#4F46E5" />
    </View>
  );
}
