import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AppStateContextType = {
  isFirstLaunch: boolean;
  hasSeenOnboarding: boolean;
  isAppReady: boolean;
  markOnboardingComplete: () => Promise<void>;
  resetAppState: () => Promise<void>;
  forceCompleteReset: () => Promise<void>;
};

const AppStateContext = createContext<AppStateContextType>({
  isFirstLaunch: true,
  hasSeenOnboarding: false,
  isAppReady: false,
  markOnboardingComplete: async () => {},
  resetAppState: async () => {},
  forceCompleteReset: async () => {},
});

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};

const ONBOARDING_KEY = "@onboarding_completed";
const FIRST_LAUNCH_KEY = "@first_launch";

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      // Check if this is the first launch ever
      const firstLaunchCheck = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
      const onboardingCompleted = await AsyncStorage.getItem(ONBOARDING_KEY);

      setIsFirstLaunch(firstLaunchCheck === null);
      setHasSeenOnboarding(onboardingCompleted === "true");

      // Mark that the app has been launched at least once
      if (firstLaunchCheck === null) {
        await AsyncStorage.setItem(FIRST_LAUNCH_KEY, "true");
      }

      setIsAppReady(true);
    } catch (error) {
      console.error("Error checking app state:", error);
      setIsAppReady(true);
    }
  };

  const markOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, "true");
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error("Error saving onboarding state:", error);
    }
  };

  const resetAppState = async () => {
    try {
      await AsyncStorage.multiRemove([ONBOARDING_KEY, FIRST_LAUNCH_KEY]);
      setIsFirstLaunch(true);
      setHasSeenOnboarding(false);
    } catch (error) {
      console.error("Error resetting app state:", error);
    }
  };

  const forceCompleteReset = async () => {
    try {
      // Clear all AsyncStorage data
      await AsyncStorage.clear();
      // Reset all state
      setIsFirstLaunch(true);
      setHasSeenOnboarding(false);
      console.log("🔄 Complete app reset performed");
    } catch (error) {
      console.error("Error performing complete reset:", error);
    }
  };

  return (
    <AppStateContext.Provider
      value={{
        isFirstLaunch,
        hasSeenOnboarding,
        isAppReady,
        markOnboardingComplete,
        resetAppState,
        forceCompleteReset,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
