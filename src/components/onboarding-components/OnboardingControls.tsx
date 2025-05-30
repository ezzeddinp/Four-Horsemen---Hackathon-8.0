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
  return (
    <View className="absolute bottom-24 w-full flex-row justify-center space-x-4 px-6">
      <TouchableOpacity
        onPress={goToPrev}
        disabled={currentIndex === 0}
        className={`flex-row items-center px-5 py-3 rounded-xl ${
          currentIndex === 0 ? 'bg-purple-300/50' : 'bg-purple-400'
        }`}
      >
        <Ionicons name="chevron-back" size={20} color="#fff" />
        <Text className="text-white ml-1 font-semibold">Back</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={goToNext}
        disabled={currentIndex === totalSlides - 1}
        className={`flex-row items-center px-5 py-3 rounded-xl ${
          currentIndex === totalSlides - 1 ? 'bg-purple-300/50' : 'bg-purple-400'
        }`}
      >
        <Text className="text-white mr-1 font-semibold">Next</Text>
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingControls;
