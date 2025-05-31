import React from 'react';
import { View, Text, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

interface OnboardingSlideProps {
  icon: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const OnboardingSlide = ({ icon, title, description, backgroundColor }: OnboardingSlideProps) => {
  return (
    <View
      style={{ width, height }}
      className={`flex justify-center items-center ${backgroundColor} px-8`}
    >
      <Image source={icon} className="h-64 w-64 mb-4"></Image>
      <Text className="text-[#7A76F1] text-3xl font-bold mb-2 text-center">
        {title}
      </Text>
      <Text className="text-[#96A7AF] text-center text-lg">{description}</Text>
    </View>
  );
};

export default OnboardingSlide;