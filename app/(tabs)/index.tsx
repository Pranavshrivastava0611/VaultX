import  React from 'react'
import { View,Text, Alert } from 'react-native'
import { useUserStore } from '@/store/useUserStore'
import { Button } from 'react-native-paper';

export default function MainScreen(){
    const {generateWallet} = useUserStore();
    const handleGenerateWallet = async()=>{
        const {publicKey, mnemonic} = await generateWallet();
        console.log("Generated Wallet:", publicKey, mnemonic);
        Alert.alert("Wallet Generated", `Public Key: ${publicKey}\nMnemonic: ${mnemonic}`);
    }


    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text> dScreen</Text>
        <Button onPress={handleGenerateWallet} >Click to generate the wallet</Button>
      </View>
    );
}