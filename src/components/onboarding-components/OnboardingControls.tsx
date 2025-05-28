import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OnboardingControlsProps {
  currentIndex: number;
  totalSlides: number;
  goToPrev: () => void;
  goToNext: () => void;
}

// Komponen ini handle tombol prev & next untuk navigasi manual oleh user

const OnboardingControls = ({ currentIndex, totalSlides, goToPrev, goToNext }: OnboardingControlsProps) => {
  return (
    <View className="absolute bottom-10 w-full flex-row justify-between px-6">
      <TouchableOpacity onPress={goToPrev} disabled={currentIndex === 0}>
        <Ionicons
          name="chevron-back"
          size={32}
          color={currentIndex === 0 ? 'gray' : 'white'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={goToNext}>
        <Ionicons
          name="chevron-forward"
          size={32}
          color={currentIndex === totalSlides - 1 ? 'gray' : 'white'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingControls;