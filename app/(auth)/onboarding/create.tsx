import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export default function CreatePinScreen() {
  const [step, setStep] = useState<'set' | 'confirm'>('set');
  const [tempPin, setTempPin] = useState('');
  const [pinInput, setPinInput] = useState('');
  const router = useRouter();


useEffect(() => {
  const checkForExistingData = async () => {
    try {
      const seed = await SecureStore.getItemAsync("wallet_mnemonic");
      const pin = await SecureStore.getItemAsync("wallet_pin");

      if (seed && pin) {
        Alert.alert(
          "Already Set",
          "Your wallet and PIN are already set.",
          [
            {
              text: "Go to Wallet",
              onPress: () => router.replace("/(auth)/onboarding/seed")
            }
          ],
          { cancelable: false }
        );
      }
    } catch (err) {
      console.error("Error checking existing seed/pin:", err);
    }
  };

  checkForExistingData();
}, []);

  const handleInput = (digit: string) => {
    if (pinInput.length < 6) {
      setPinInput(pinInput + digit);
    }
  };

  const handleBackspace = () => {
    setPinInput(pinInput.slice(0, -1));
  };

  useEffect(() => {
    if (pinInput.length === 6) {
      if (step === 'set') {
        setTempPin(pinInput);
        setPinInput('');
        setStep('confirm');
      } else {
        if (pinInput === tempPin) {
          SecureStore.setItemAsync('wallet_pin', pinInput);
          Alert.alert('Success', 'PIN set successfully!');
          setTimeout(() => {
            router.push('/(auth)/onboarding/seed');
          }, 500);
        } else {
          Alert.alert('Mismatch', 'PINs did not match. Try again.');
          setPinInput('');
          setStep('set');
        }
      }
    }
  }, [pinInput]);

  const renderPinDots = () => {
    return Array.from({ length: 6 }).map((_, i) => (
      <View key={i} style={[styles.dot, i < pinInput.length && styles.filledDot]} />
    ));
  };

  const NumButton = ({ digit }: { digit: string }) => (
    <TouchableOpacity
      style={styles.numButton}
      onPress={() => handleInput(digit)}
      activeOpacity={0.7}
    >
      <Text style={styles.numButtonText}>{digit}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {step === 'set' ? 'Set your 6-digit PIN' : 'Confirm your PIN'}
      </Text>

      <View style={styles.pinContainer}>{renderPinDots()}</View>

      <View style={styles.numpad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <NumButton key={n} digit={n.toString()} />
        ))}
        <View style={styles.numButton} />
        <NumButton digit="0" />
        <TouchableOpacity
          style={styles.numButton}
          onPress={handleBackspace}
          activeOpacity={0.7}
        >
          <Text style={styles.numButtonText}>⌫</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 32,
    color: '#111827',
    textAlign: 'center',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 48,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4F46E5',
    marginHorizontal: 6,
  },
  filledDot: {
    backgroundColor: '#4F46E5',
  },
  numpad: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  numButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#E0E7FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  numButtonText: {
    fontSize: 32,
    color: '#4F46E5',
    fontWeight: '600',
  },
});
