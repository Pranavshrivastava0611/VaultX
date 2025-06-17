import "react-native-get-random-values";
import { Buffer } from "buffer";
global.Buffer = Buffer;

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
          <Stack
            screenOptions={{
              headerShown: true,
              title: "VaultX",
              headerTitleAlign : "center"
            }}

          />
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
