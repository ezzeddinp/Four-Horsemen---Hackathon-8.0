import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';


// Komponen ini digunakan untuk menampilkan tombol "Get Started" pada halaman onboarding

const OnboardingGetStarted = () => {
  const router = useRouter();

  return (
    <View className="absolute bottom-3 w-full items-center">
      <TouchableOpacity
        className="bg-white px-6 py-2 rounded-full"
        onPress={() => router.replace('/login')}
      >
        <Text className="text-black text-lg font-bold">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingGetStarted;