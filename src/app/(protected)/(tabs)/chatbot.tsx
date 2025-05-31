import * as React from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const ChatbotStart = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#f2f0ef]">
      {/* Back Button - Fixed Position */}
      <TouchableOpacity
        className="absolute top-12 left-4 z-50"
        onPress={() => router.replace("/(protected)/(tabs)/index.tsx")}
      >
        <Image
          source={require("/Users/billy/codeOS/projects/Four-Horsemen---Hackathon-8.0/assets/Chatbot-startchat/arrow-left.png")}
          className="w-8 h-8"
          style={{ tintColor: "#000000" }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Main Content */}
      <View className="flex-1 pt-16">
        {/* Welcome Message */}
        <View className="items-center justify-center py-8">
          <Text className="text-[30px] leading-[48px] font-bold text-center">
            <Text className="text-[#7a76f1]">Welcome To{"\n"}</Text>
            <Text className="text-[#a78df8]">MedAI</Text>
          </Text>
        </View>

        {/* Chat Messages */}
        <View className="flex-1 px-4">
          {/* Bot Message */}
          <View className="bg-white rounded-2xl p-4 mb-4 max-w-[80%] shadow-sm">
            <Text className="text-gray-800 text-base">
              Hello! I'm MedAI, your medical assistant. How can I help you
              today?
            </Text>
          </View>
        </View>

        {/* Input Area */}
        <View className="px-4 pb-4">
          <View className="flex-row items-center bg-white rounded-full p-2 shadow-sm">
            <TextInput
              className="flex-1 ml-2 text-base text-gray-600"
              placeholder="Type your message..."
              placeholderTextColor="#999"
            />
            <TouchableOpacity className="bg-[#7a76f1] p-3 rounded-full">
              <Image
                source={require("/Users/billy/codeOS/projects/Four-Horsemen---Hackathon-8.0/assets/Chatbot-startchat/mynaui_send-solid.svg")}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Navigation Bar */}
      <View className="bg-white h-[109px] shadow-lg shadow-[rgba(193,193,193,0.25)]">
        <View className="flex-row justify-center items-center h-full gap-10">
          <Image
            source={require("/Users/billy/codeOS/projects/Four-Horsemen---Hackathon-8.0/assets/Chatbot-startchat/Frame 11.svg")}
            className="w-[30px] h-[30px]"
            resizeMode="contain"
          />
          <Image
            source={require("/Users/billy/codeOS/projects/Four-Horsemen---Hackathon-8.0/assets/Chatbot-startchat/Rectangle 18053.svg")}
            className="w-[50px] h-[50px]"
            resizeMode="contain"
          />
          <Image
            source={require("/Users/billy/codeOS/projects/Four-Horsemen---Hackathon-8.0/assets/Chatbot-startchat/Rectangle 18053 (1).svg")}
            className="w-[30px] h-[30px]"
            resizeMode="contain"
          />
          <View className="w-[19px] h-[26px] bg-gray-300 rounded-full" />
          <View className="w-[30px] h-[30px] bg-gray-300 rounded-full" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatbotStart;
