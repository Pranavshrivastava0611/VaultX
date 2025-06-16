import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export default function CreatePinScreen() {
  const [step, setStep] = useState<'set' | 'confirm'>('set');
  const [tempPin, setTempPin] = useState('');
  const [pinInput, setPinInput] = useState('');
  const router = useRouter();

  // Called when user presses a numpad button

  useEffect(()=>{
    const checkForTheSeed = async ()=>{
      const password = await SecureStore.getItemAsync("wallet_pin");
      if(password) router.canGoBack();
    }

    checkForTheSeed();
  },[]);
  const handleInput = (digit: string) => {
    if (pinInput.length < 6) {
      setPinInput(pinInput + digit);
    }
  };

  // Called when user presses backspace
  const handleBackspace = () => {
    setPinInput(pinInput.slice(0, -1));
  };

  // Called when user finishes entering 6 digits
  React.useEffect(() => {
    if (pinInput.length === 6) {
      if (step === 'set') {
        setTempPin(pinInput);
        setPinInput('');
        setStep('confirm');
      } else {
        if (pinInput === tempPin) {
          SecureStore.setItemAsync('wallet_pin', pinInput);
          Alert.alert('Success', 'PIN set successfully!');
          router.push('/(auth)/onboarding/seed'); 
        } else {
          Alert.alert('Mismatch', 'PIN does not match. Try again.');
          setPinInput('');
          setStep('set');
        }
      }
    }
  }, [pinInput]);

  // Display PIN digits as dots
  const renderPinDots = () => {
    const dots = [];
    for (let i = 0; i < 6; i++) {
      dots.push(
        <View key={i} style={[styles.dot, i < pinInput.length && styles.filledDot]} />
      );
    }
    return dots;
  };

  // Render a single numpad button
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
    marginBottom: 40,
    color: '#111827',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 60,
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
  },
  numButton: {
    width: '30%',
    aspectRatio: 1, // square buttons
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
