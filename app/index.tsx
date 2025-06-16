
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import {getItemAsync} from "expo-secure-store"
import { useEffect } from "react";
import "react-native-get-random-values";
import { Buffer } from "buffer";
global.Buffer = Buffer;
import 'react-native-get-random-values';



export default function Index() {
  const router = useRouter();

  useEffect(()=>{
        const checkOnboarding = async ()=>{
            const password = await getItemAsync('wallet_pin');
            const seed = await getItemAsync('wallet_seed');

            if (!password || !seed) {
        // First launch
            router.replace('/(auth)/onboarding');
      } else {
        // Password is set → Go to login every time
        router.replace('/(auth)/login');
      }

    }
    checkOnboarding(); 
  },[])

  return (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#4F46E5" />
    </View>
  );
}
