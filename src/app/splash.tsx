import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-[#F2F0EF] justify-center items-center">
      <Image
        source={require("assets/medbay-splash.png")}
        className="h-32 w-32"
      />
    </View>
  );
}
