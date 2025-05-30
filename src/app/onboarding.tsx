import React, { useRef, useState, useEffect } from "react";
import { View, FlatList, Dimensions } from "react-native";
import { onboardingUtils } from "@/constants/OnboardingUtils";
import { useRouter } from "expo-router";

import OnboardingSlide from "@/components/onboarding-components/OnboardingSlide";
import OnboardingBullets from "@/components/onboarding-components/OnboardingBullets";
import OnboardingControls from "@/components/onboarding-components/OnboardingControls";
import OnboardingGetStarted from "@/components/onboarding-components/OnboardingGetStarted";

// Komponen ini digunakan untuk menampilkan halaman onboarding pada aplikasi

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === onboardingUtils.length - 1 ? 0 : currentIndex + 1;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  const goToNext = () => {
    if (currentIndex < onboardingUtils.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.replace("/login");
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  const getItemLayout = (_: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  return (
    <View className="flex-1 bg-transparent">
      <FlatList
        ref={flatListRef}
        data={onboardingUtils}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        renderItem={({ item }) => (
          <OnboardingSlide
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            description={item.description}
            backgroundColor={item.backgroundColor}
          />
        )}
      />
      <OnboardingBullets
        currentIndex={currentIndex}
        totalSlides={onboardingUtils.length}
      />
      <OnboardingControls
        currentIndex={currentIndex}
        totalSlides={onboardingUtils.length}
        goToPrev={goToPrev}
        goToNext={goToNext}
      />
      {currentIndex === onboardingUtils.length - 1 && <OnboardingGetStarted />}
    </View>
  );
}
