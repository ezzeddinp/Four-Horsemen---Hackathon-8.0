import React from 'react';
import { View } from 'react-native';

interface OnboardingBulletsProps {
  currentIndex: number;
  totalSlides: number;
}

// Komponen ini nampilin titik-titik kecil di bawah slide onboarding
const OnboardingBullets = ({ currentIndex, totalSlides }: OnboardingBulletsProps) => {
  return (
    <View className="absolute bottom-72 w-full flex-row justify-center gap-4">
      {Array.from({ length: totalSlides }, (_, i) => (
        <View
          key={i}
          className={`h-3 rounded-full ${i === currentIndex ? 'w-3 bg-[#7A76F1]' : 'w-3 bg-gray-300'}`}
        />
      ))}
    </View>
  );
};

export default OnboardingBullets;