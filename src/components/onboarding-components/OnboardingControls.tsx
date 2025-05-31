import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OnboardingControlsProps {
  currentIndex: number;
  totalSlides: number;
  goToPrev: () => void;
  goToNext: () => void;
}

const OnboardingControls = ({
  currentIndex,
  totalSlides,
  goToPrev,
  goToNext,
}: OnboardingControlsProps) => {
  // Jangan render tombol kalau di slide terakhir
  if (currentIndex === totalSlides - 1) return null;

  return (
    <View className="absolute bottom-24 w-full flex-row justify-center space-x-4 gap-2 px-6">
      <TouchableOpacity
        onPress={goToPrev}
        disabled={currentIndex === 0}
        className={`flex-row items-center px-16 py-6 rounded-xl ${
          'bg-[#A78DF8]'
        }`}
      >
        <Ionicons name="chevron-back" size={20} color="#fff" />
        <Text className="text-white ml-1 font-semibold">Back</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={goToNext}
        className="flex-row items-center px-16 py-6 rounded-xl bg-[#A78DF8]"
      >
        <Text className="text-white mr-1 font-semibold">Next</Text>
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingControls;
