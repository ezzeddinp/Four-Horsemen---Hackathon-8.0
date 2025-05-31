import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface Medicine {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  price: number;
  image: string;
}

const SeeMedicine1 = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const categories = ["All", "General", "Syrup", "Pill"];

  const medicines: Medicine[] = [
    {
      id: "1",
      name: "Paracetamol 500mg",
      type: "Pill",
      manufacturer: "PT Kimia Farma",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "2",
      name: "Amoxicillin 500mg",
      type: "Capsule",
      manufacturer: "PT Sanbe Farma",
      price: 25000,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "3",
      name: "OBH Combi",
      type: "Syrup",
      manufacturer: "PT Combiphar",
      price: 35000,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "4",
      name: "Vitamin C 500mg",
      type: "Pill",
      manufacturer: "PT Bayer",
      price: 45000,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "5",
      name: "Promag",
      type: "Pill",
      manufacturer: "PT Kalbe Farma",
      price: 20000,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
    },
  ];

  const filteredAndSortedMedicines = medicines
    .filter((medicine) => {
      const matchesCategory =
        selectedCategory === "All" || medicine.type === selectedCategory;
      const matchesSearch = medicine.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      }
      return b.price - a.price;
    });

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  const renderMedicineCard = useCallback(
    ({ item }: { item: Medicine }) => (
      <TouchableOpacity
        className="bg-[#f2f0ef] p-3 rounded-xl flex-row items-center mb-4 shadow-sm border border-[#f3f4f6]"
        activeOpacity={0.7}
      >
        <Image
          className="w-[109px] h-[109px] rounded-xl"
          source={{ uri: item.image }}
          resizeMode="cover"
        />
        <View className="flex-1 ml-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-[#1f2a37] text-base font-bold">
              {item.name}
            </Text>
          </View>
          <View className="h-[1px] bg-[#e5e7eb] my-2" />
          <Text className="text-[#4b5563] text-sm font-semibold mb-1">
            {item.type}
          </Text>
          <View className="flex-row items-center gap-1 mb-1">
            <Ionicons name="business-outline" size={14} color="#4b5563" />
            <Text className="text-[#4b5563] text-sm flex-1">
              {item.manufacturer}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-[#A78DF8] text-base font-semibold">
              {formatPrice(item.price)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    []
  );

  const keyExtractor = useCallback((item: Medicine) => item.id, []);

  const ListEmptyComponent = useCallback(
    () => (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-base text-gray-600 text-center">
          No medicines found. Try adjusting your search or filters.
        </Text>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f2f0ef]">
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 pt-4">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-[#374151] text-xl font-semibold">
              All Medicine
            </Text>
            <View className="w-6" />
          </View>

          {/* Search Bar */}
          <View className="bg-[#f3f4f6] rounded-lg h-10 flex-row items-center px-4 mb-4">
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-2 text-sm text-[#9ca3af]"
              placeholder="Search medicine..."
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
              {filteredAndSortedMedicines.length} founds
            </Text>
            <TouchableOpacity
              className="flex-row items-center gap-1"
              onPress={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              <Text className="text-[#6b7280] text-sm font-semibold">
                {sortOrder === "asc" ? "Low to High" : "High to Low"}
              </Text>
              <Ionicons name="chevron-down" size={14} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Medicine Cards */}
        <FlatList
          data={filteredAndSortedMedicines}
          renderItem={renderMedicineCard}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default SeeMedicine1;
