import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { useAppState } from "@/providers/AppStateProvider";

export default function Index() {
  const { isAuthenticated, user } = useAuth();
  const { isAppReady, isFirstLaunch, hasSeenOnboarding } = useAppState();

  // Debug logging
  React.useEffect(() => {
    console.log("🚀 Index.tsx - App State:", {
      isAuthenticated,
      isAppReady,
      isFirstLaunch,
      hasSeenOnboarding,
      userEmail: user?.email,
    });
  }, [isAuthenticated, isAppReady, isFirstLaunch, hasSeenOnboarding, user]);

  // Show loading while checking app state
  if (!isAppReady) {
    return (
      <View className="flex-1 bg-[#F2F0EF] justify-center items-center">
        <ActivityIndicator size="large" color="#A78DF8" />
        <Text className="text-[#1F2A37] mt-4">Loading...</Text>
      </View>
    );
  }

  // App flow logic:
  // 1. Always start with splash on first launch or reload
  // 2. Then go to onboarding if not completed
  // 3. Then go to auth if not authenticated
  // 4. Finally go to main app if authenticated

  // If user is authenticated but hasn't seen onboarding, show onboarding first
  if (isAuthenticated && !hasSeenOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  // If user is authenticated and has seen onboarding, go to main app
  if (isAuthenticated && hasSeenOnboarding) {
    return <Redirect href="/(protected)/(tabs)" />;
  }

  // If not authenticated and hasn't seen onboarding, start with splash
  if (!hasSeenOnboarding) {
    return <Redirect href="/splash" />;
  }

  // If not authenticated but has seen onboarding, go to login
  return <Redirect href="/(auth)/login" />;
}
