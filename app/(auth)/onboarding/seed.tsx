import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, SafeAreaView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { generateWallet } from '@/utils/actions/seed';
import { useRouter } from 'expo-router';

export default function SeedScreen() {
  const [warning, setWarning] = useState(true);
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const router = useRouter();

  const handleContinue = async () => {
    if (warning) {
      setWarning(false);
      const wallet = await generateWallet();
      setMnemonic(wallet.mnemonic.split(' '));
    } else {
      Alert.alert("✅", "You can now proceed to the next step.");
      // Navigate further
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={styles.title}>
              {warning ? '⚠️ Important Warning' : '🔐 Your Seed Phrase'}
            </Text>

            <Card style={styles.card}>
              <Card.Content>
                {warning ? (
                  <View>
                    <Text style={styles.warningTitle}>Security Notice</Text>
                    <Text style={styles.warningText}>
                      This seed phrase is the ONLY way to recover your wallet. Keep it safe and private. If lost, access to your funds cannot be restored.
                    </Text>
                    <View style={styles.warningPoints}>
                      <Text style={styles.bulletPoint}>• Never share your seed phrase with anyone</Text>
                      <Text style={styles.bulletPoint}>• Store it in a secure offline location</Text>
                      <Text style={styles.bulletPoint}>• Write it down on paper as backup</Text>
                    </View>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.seedTitle}>Write down these 12 words in order:</Text>
                    <View style={styles.seedGrid}>
                      {mnemonic.map((word, index) => (
                        <View key={index} style={styles.wordBox}>
                          <Text style={styles.word}>{word}</Text>
                        </View>
                      ))}
                    </View>
                    <Text style={styles.seedFooter}>
                      Keep this phrase safe and never share it with anyone.
                    </Text>
                  </View>
                )}
              </Card.Content>
            </Card>

           {warning ?  <Button
              mode="contained"
              onPress={handleContinue}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              'I Understand, Show My Seed Phrase'
            </Button> : <Button  mode="contained"
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              onPress={()=>router.replace("/(tabs)")}>
                Continue SetUp
            </Button>
           }

            {!warning && (
              <Text style={styles.disclaimer}>
                Make sure you've written down your seed phrase before continuing.
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    marginVertical : 10
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    minHeight: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    color: '#1e40af',
  },
  card: {
    backgroundColor: '#ffffff',
    elevation: 6,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#e1e7ef',
  },
  warningTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 16,
  },
  warningText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 20,
  },
  warningPoints: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  bulletPoint: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 8,
    lineHeight: 20,
  },
  seedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 20,
  },
  seedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    gap: 6,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  wordBox: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '40%',
    minWidth: 80,
    marginBottom: 8,
  },
  wordIndex: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  word: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
  },
  seedFooter: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button: {
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    elevation: 4,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  disclaimer: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
});