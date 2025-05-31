import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

const OnboardingGetStarted = () => {
  const router = useRouter();

  return (
    <View className="absolute bottom-24 w-full items-center space-y-3 gap-2 ">
      <TouchableOpacity
        className="bg-[#7A76F1] px-6 py-4 rounded-[12px] w-3/4 items-center"
        onPress={() => router.replace('/signup')}
      >
        <Text className="text-white text-lg font-semibold">Sign Me Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-[#A78DF8] px-6 py-4 rounded-[12px] w-3/4 items-center"
        onPress={() => router.replace('/login')}
      >
        <Text className="text-white text-lg font-semibold">Already Have an Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingGetStarted;
