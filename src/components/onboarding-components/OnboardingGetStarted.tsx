import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAppState } from "@/providers/AppStateProvider";
import { supabase } from "@/lib/supabase";

const OnboardingGetStarted = () => {
  const router = useRouter();
  const { markOnboardingComplete } = useAppState();

  const handleNavigation = async (route: string) => {
    console.log("🎯 OnboardingGetStarted: Navigating to", route);

    // Mark onboarding as complete
    await markOnboardingComplete();

    // ALWAYS force logout first to clear any cached sessions
    console.log("🧹 Clearing any existing authentication sessions...");
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        console.log("⚠️ Found cached session for:", user.email);
        console.log("🔥 Force signing out...");
        await supabase.auth.signOut();

        // Wait a moment for the signout to complete
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Verify signout worked
        const {
          data: { user: afterSignout },
        } = await supabase.auth.getUser();
        if (afterSignout) {
          console.log(
            "❌ Signout failed, user still exists:",
            afterSignout.email
          );
        } else {
          console.log("✅ Successfully signed out");
        }
      } else {
        console.log("✅ No existing authentication session found");
      }
    } catch (error) {
      console.log("🔧 Error during cleanup:", error);
    }

    router.replace(route as any);
  };

  return (
    <View className="absolute bottom-24 w-full items-center space-y-3 gap-2 ">
      <TouchableOpacity
        className="bg-[#7A76F1] px-6 py-4 rounded-[12px] w-3/4 items-center"
        onPress={() => handleNavigation("/(auth)/signup")}
      >
        <Text className="text-white text-lg font-semibold">Sign Me Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-[#A78DF8] px-6 py-4 rounded-[12px] w-3/4 items-center"
        onPress={() => handleNavigation("/(auth)/login")}
      >
        <Text className="text-white text-lg font-semibold">
          Already Have an Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingGetStarted;
