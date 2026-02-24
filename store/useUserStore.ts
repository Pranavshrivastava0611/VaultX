import { create } from "zustand";
import { derivePath } from "ed25519-hd-key";
import { getItemAsync,setItemAsync } from "expo-secure-store";
import * as bip39 from "bip39";
import * as nacl from "tweetnacl";
import bs58 from "bs58";


export interface Wallet {
  publicKey: string;
  index: number;
  // secretKey?: string; // add only if needed (optional)
}
interface UserStore {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  isWalletLoading: boolean;
  getWallets: () => Promise<void>;
  generateWallet: () => Promise<{ publicKey: string; mnemonic: string }>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  wallets: [],
  selectedWallet: null,
  isWalletLoading: false,

  getWallets: async () => {
    set({ isWalletLoading: true });
    try {
      const mnemonic = await getItemAsync("wallet_mnemonic");
      const countStr = await getItemAsync("wallet_count");

      if (!mnemonic || !countStr) throw new Error("Missing mnemonic or count");

      const count = parseInt(countStr);
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const deriveSeed = seed.slice(0, 32);

      const wallets: Wallet[] = [];

      for (let i = 0; i < count; i++) {
        const { key } = derivePath(`m/44'/501'/${i}'/0'`, deriveSeed.toString("hex"));
        const keypair = nacl.sign.keyPair.fromSeed(key);
        const publicKey = bs58.encode(keypair.publicKey);
        const secretKey = bs58.encode(keypair.secretKey);
        wallets.push({
          publicKey,
          index: i,
        });
        await setItemAsync(`${publicKey}`, secretKey);
      }
        set({ wallets, selectedWallet: wallets[0] || null })
        set({isWalletLoading: false });
    } catch (err) {
      console.error("Failed to derive wallets", err);
      set({ isWalletLoading: false });
    }
  },

  generateWallet : async ()=>{
    const wallet_count = await getItemAsync("wallet_count");
     const mnemonic = await getItemAsync("wallet_mnemonic");

     if (!mnemonic || !wallet_count)
       throw new Error("Missing mnemonic or count");

     const count = parseInt(wallet_count);
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const deriveSeed = seed.slice(0, 32);

      const { key } = derivePath(`m/44'/501'/${count+1}'/0'`, deriveSeed.toString("hex"));
      const keypair = nacl.sign.keyPair.fromSeed(key);
      const publicKey = bs58.encode(keypair.publicKey);
      const secretKey = bs58.encode(keypair.secretKey);     
      await setItemAsync(`${publicKey}`, secretKey);
      await setItemAsync("wallet_count", (count + 1).toString());
      return {
        publicKey,
        mnemonic: mnemonic.split(" ").slice(0, 12).join(" "),
      };
  }
}));
