import React from 'react';
import { View, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface OnboardingSlideProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundColor: string;
}

const OnboardingSlide = ({ icon, title, subtitle, description, backgroundColor }: OnboardingSlideProps) => {
  return (
    <View
      style={{ width }}
      className={`flex-1 justify-center items-center ${backgroundColor} px-8`}
    >
      <Text className="text-6xl mb-4">{icon}</Text>
      <Text className="text-white text-3xl font-bold mb-2 text-center">{title}</Text>
      <Text className="text-white text-xl mb-4 italic text-center">{subtitle}</Text>
      <Text className="text-white text-center text-base">{description}</Text>
    </View>
  );
};

export default OnboardingSlide;