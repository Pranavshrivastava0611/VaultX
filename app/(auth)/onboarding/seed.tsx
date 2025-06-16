import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { generateWallet } from '@/utils/actions/seed';

export default function SeedScreen() {
  const [warning, setWarning] = useState(true);
  const [mnemonic, setMnemonic] = useState('');

  const handleContinue = async () => {
    if (warning) {
      setWarning(false);
      const wallet = await generateWallet();
      setMnemonic(wallet.mnemonic);
      console.log('Seed generated:', wallet);
    } else {
      Alert.alert("Note", "You can now proceed to the next step.");
      // Navigate further or store mnemonic securely
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>
          {warning ? '⚠️ Warning' : '🪙 Your Seed Phrase'}
        </Text>

        <Text style={styles.body}>
          {warning
            ? 'This seed phrase is the ONLY way to recover your wallet. Keep it private and store it securely. Anyone with this phrase can access your funds.'
            : mnemonic}
        </Text>

        <Button mode="contained" onPress={handleContinue} style={styles.button}>
          {warning ? 'I Understand, Show My Seed Phrase' : 'Proceed'}
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
    color: '#1f2937',
  },
  button: {
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
});
