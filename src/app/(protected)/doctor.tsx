import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  rating: number;
  reviews: number;
  image: string;
}

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. David Patel",
    specialization: "Cardiologist",
    hospital: "Cardiology Center, USA",
    rating: 5,
    reviews: 1872,
    image: "https://via.placeholder.com/109",
  },
  {
    id: "2",
    name: "Dr. Jessica Turner",
    specialization: "Gynecologist",
    hospital: "Women's Clinic, Seattle, USA",
    rating: 4.9,
    reviews: 127,
    image: "https://via.placeholder.com/109",
  },
  {
    id: "3",
    name: "Dr. Michael Johnson",
    specialization: "Orthopedic Surgery",
    hospital: "Maple Associates, NY, USA",
    rating: 4.7,
    reviews: 5223,
    image: "https://via.placeholder.com/109",
  },
  {
    id: "4",
    name: "Dr. Emily Walker",
    specialization: "Pediatrics",
    hospital: "Serenity Pediatrics Clinic",
    rating: 5,
    reviews: 405,
    image: "https://via.placeholder.com/109",
  },
];

const categories = ["All", "General", "Cardiologist", "Dentist"];

export default function DoctorScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const renderDoctorCard = (doctor: Doctor) => (
    <TouchableOpacity
      key={doctor.id}
      className="bg-[#f2f0ef] p-3 rounded-xl flex-row items-center mb-4 shadow-sm border border-[#f3f4f6]"
      onPress={() => router.push(`/doctor/${doctor.id}`)}
    >
      <Image
        source={{ uri: doctor.image }}
        className="w-[109px] h-[109px] rounded-xl"
      />
      <View className="flex-1 ml-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-[#1f2a37] text-base font-bold">
            {doctor.name}
          </Text>
        </View>
        <View className="h-[1px] bg-[#e5e7eb] my-2" />
        <Text className="text-[#4b5563] text-sm font-semibold mb-1">
          {doctor.specialization}
        </Text>
        <View className="flex-row items-center gap-1 mb-1">
          <Ionicons name="location-outline" size={14} color="#4b5563" />
          <Text className="text-[#4b5563] text-sm flex-1">
            {doctor.hospital}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <View className="flex-row items-center gap-1">
            <AntDesign name="star" size={16} color="#fbbf24" />
            <Text className="text-[#6b7280] text-xs">{doctor.rating}</Text>
          </View>
          <View className="h-3 w-[1px] bg-[#4b5563]" />
          <Text className="text-[#6b7280] text-xs">
            {doctor.reviews} Reviews
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f2f0ef]">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-4 pt-4">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-[#374151] text-xl font-semibold">
              All Doctors
            </Text>
            <View className="w-6" />
          </View>

          {/* Search Bar */}
          <View className="bg-[#f3f4f6] rounded-lg h-10 flex-row items-center px-4 mb-4">
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-2 text-sm text-[#9ca3af]"
              placeholder="Search doctor..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className={`mr-2 px-5 py-2 rounded-full ${
                  selectedCategory === category
                    ? "bg-[#A78DF8]"
                    : "border border-[#A78DF8]"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    selectedCategory === category
                      ? "text-[#f2f0ef]"
                      : "text-[#A78DF8]"
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Results and Sort */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[#1f2a37] text-base font-bold">
              {doctors.length} founds
            </Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-[#6b7280] text-sm font-semibold">
                Default
              </Text>
              <Ionicons name="chevron-down" size={14} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Doctor Cards */}
        <View className="px-4">{doctors.map(renderDoctorCard)}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
