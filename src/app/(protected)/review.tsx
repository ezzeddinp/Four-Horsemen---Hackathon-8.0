import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const starOptions = [
  { value: 1, label: "Poor" },
  { value: 2, label: "Bad" },
  { value: 3, label: "Average" },
  { value: 4, label: "Good" },
  { value: 5, label: "Excellent" },
];

const ReviewPage = () => {
  const params = useLocalSearchParams();
  const doctor = (params.doctor as string) || "Dr. David Patel";
  const specialty = (params.specialty as string) || "Cardiologist";
  const location = (params.location as string) || "Golden Cardiology Center";
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSend = () => {
    setShowThankYou(true);
    // Optionally, you can add review submission logic here
  };

  const handleCloseThankYou = () => {
    setShowThankYou(false);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F0EF]">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-6 pt-4 pb-6">
          <TouchableOpacity onPress={() => router.back()} className="mr-6">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-[#374151] text-xl font-semibold flex-1">
            Doctor Review
          </Text>
        </View>

        {/* Doctor Card */}
        <View className="bg-[#F2F0EF] rounded-xl border border-[#F3F4F6] shadow p-4 mx-6 flex-row items-center">
          <Image
            source={require("assets/Profile_avatar_placeholder_large.png")}
            className="w-[80px] h-[80px] rounded-xl"
            resizeMode="cover"
          />
          <View className="ml-4 flex-1">
            <Text className="text-[#1F2A37] text-lg font-bold mb-1">
              {doctor}
            </Text>
            <View className="h-[1px] bg-[#E5E7EB] my-1" />
            <Text className="text-[#4B5563] text-base font-semibold mb-1">
              {specialty}
            </Text>
            <View className="flex-row items-center gap-1 mt-1">
              <Ionicons name="business-outline" size={14} color="#4B5563" />
              <Text className="text-[#4B5563] text-sm flex-1">{location}</Text>
            </View>
          </View>
        </View>

        {/* Review Title */}
        <View className="px-6 mt-8 mb-2">
          <Text className="text-[#1F2A37] text-xl font-semibold">Review</Text>
        </View>

        {/* Star Rating */}
        <View className="flex-row justify-between px-10 mt-2 mb-6">
          {starOptions.map((star) => (
            <TouchableOpacity
              key={star.value}
              onPress={() => setSelectedRating(star.value)}
              className="items-center"
            >
              <Ionicons
                name={selectedRating >= star.value ? "star" : "star-outline"}
                size={44}
                color={selectedRating >= star.value ? "#A78DF8" : "#E5E7EB"}
              />
              <Text className="text-xs mt-1 text-[#1F2A37]">{star.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Write Your Review */}
        <View className="px-6 mb-2">
          <Text className="text-[#1F2A37] text-xl font-semibold mb-2">
            Write Your Review
          </Text>
          <TextInput
            className="bg-white border border-[#F3F4F6] rounded-xl p-4 text-base text-[#1F2A37] min-h-[100px]"
            multiline
            placeholder="Share your experience..."
            value={reviewText}
            onChangeText={setReviewText}
          />
        </View>
      </ScrollView>

      {/* Send Button */}
      <View className="px-6 py-6 bg-[#F2F0EF] border-t border-[#E5E7EB]">
        <TouchableOpacity
          className={`rounded-full py-3 px-5 flex-row justify-center items-center ${
            selectedRating && reviewText ? "bg-[#A78DF8]" : "bg-gray-400"
          }`}
          disabled={!selectedRating || !reviewText}
          onPress={handleSend}
        >
          <Text className="text-white text-base font-bold">Send</Text>
        </TouchableOpacity>
      </View>

      {/* Thank You Modal */}
      <Modal
        visible={showThankYou}
        transparent
        animationType="fade"
        onRequestClose={handleCloseThankYou}
      >
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="bg-white rounded-xl p-8 w-80 items-center">
            <Text className="text-2xl font-bold text-[#A78DF8] mb-4">
              Thank You!
            </Text>
            <Text className="text-[#374151] text-base text-center mb-6">
              Your review has been submitted successfully.
            </Text>
            <TouchableOpacity
              className="bg-[#A78DF8] rounded-full px-8 py-3"
              onPress={handleCloseThankYou}
            >
              <Text className="text-white text-base font-bold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ReviewPage;
