import * as bip39 from 'bip39';
import * as nacl from 'tweetnacl';
import * as SecureStore from 'expo-secure-store';
import bs58 from 'bs58';

/**
 * Generates a new Solana HD wallet.
 * 
 * @returns An object with mnemonic, publicKey, and secretKey
 */
export const generateWallet = async () => {
  try {
    // Step 1: Generate 24-word mnemonic
    const mnemonic = bip39.generateMnemonic(256); // 24-word phrase
    // await SecureStore.setItemAsync("wallet_mnemonic", mnemonic);

    // Step 2: Convert mnemonic to seed buffer
    const seed = await bip39.mnemonicToSeed(mnemonic);

    // Step 3: Solana requires 32-byte seed, take first 32 bytes
    const derivedSeed = seed.slice(0, 32);

    // Step 4: Generate keypair from seed
    const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);

    // Step 5: Encode keys to base58 (Solana format)
    const publicKey = bs58.encode(keypair.publicKey);
    const secretKey = bs58.encode(keypair.secretKey);

    // Step 6: Store keys securely
    // await SecureStore.setItemAsync("wallet_publicKey", publicKey);
    // await SecureStore.setItemAsync("wallet_secretKey", secretKey);

    // Step 7: Return values
    return {
      mnemonic,
      publicKey,
      secretKey,
    };
  } catch (error) {
    console.error("Wallet generation failed:", error);
    throw error;
  }
};
