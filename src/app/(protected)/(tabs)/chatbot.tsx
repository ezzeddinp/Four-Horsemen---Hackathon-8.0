import * as React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Chatbot = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#f2f0ef] h-[874px] w-full overflow-hidden">
      {/* Welcome Text */}
      <Text className="absolute left-1/2 top-[373px] -ml-[142px] text-center text-[30px] leading-[48px] font-bold font-['Inter-Bold'] w-[284px]">
        <Text className="text-[#7a76f1]">Welcome To{"\n"}</Text>
        <Text className="text-[#a78df8]">MedAI</Text>
      </Text>

      {/* Navigation Bar */}
      <View className="absolute top-[765px] left-0 w-[402px] h-[109px] shadow-lg shadow-[rgba(193,193,193,0.25)]">
        {/* Navigation Icons */}
        <View className="absolute left-1/2 top-[17px] -ml-[159.59px] h-[51px] flex-row gap-10">
          <View className="w-[30px] h-[30px] bg-gray-300 rounded-full" />
          <View className="w-[50px] h-[50px] bg-gray-300 rounded-full" />
          <View className="w-[30px] h-[30px] bg-gray-300 rounded-full" />
          <View className="w-[19px] h-[26px] bg-gray-300 rounded-full" />
          <View className="w-[30px] h-[30px] bg-gray-300 rounded-full" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chatbot; 