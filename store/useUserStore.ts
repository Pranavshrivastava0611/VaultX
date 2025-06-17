import {create} from "zustand";
import {derivePath } from "ed25519-hd-key"
import { getItemAsync,setItemAsync } from "expo-secure-store";
import * as bip39 from 'bip39';
import * as nacl from 'tweetnacl';
import bs58 from 'bs58';



export const useUserStore = create((set,get)=>({
    wallets : [],
    selectedWallet : null,
    isWalletLoading : false,

    getWallets : async ()=>{
        set({isWalletLoading : true})
        const mnemonic = await getItemAsync("wallet_mnemonic");
        let index = 0 ;
        const seed = await bip39.mnemonicToSeed(mnemonic!);
        const derivePath = seed.slice(0,32);
        
        
        

    },

    



}))