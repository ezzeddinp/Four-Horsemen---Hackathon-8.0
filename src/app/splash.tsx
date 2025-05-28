
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';

useEffect(() => {
  SplashScreen.hideAsync();
}, []);


export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-blue-500 justify-center items-center">
      <Text className="text-white text-4xl font-bold">🔥 Splash Screen</Text>
    </View>
  );
}
