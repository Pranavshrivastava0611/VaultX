import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnBoardingScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/(auth)/onboarding/create');
  };

  return (
    <View style={styles.container}>
      {/* Image or Logo */}
      <View style={styles.imageContainer}>
        {/* <Image
          source={require('@/assets/secure-wallet.png')} // Replace with your image path
          style={styles.image}
          resizeMode="contain"
        /> */}
      </View>

      {/* Welcome Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to VaultX</Text>
        <Text style={styles.subtitle}>
          Your secure multi-chain wallet for Ethereum, Solana, and Bitcoin. Fully non-custodial. You control everything.
        </Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 48,
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 250,
  },
  textContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937', // dark gray
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280', // light gray
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 999,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

