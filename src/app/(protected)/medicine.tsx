import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Platform,
} from "react-native";
import { router } from "expo-router";

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
        className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
        activeOpacity={0.7}
      >
        <View className="flex-row items-center">
          <Image
            className="w-20 h-20 rounded-lg"
            source={{ uri: item.image }}
            resizeMode="cover"
          />
          <View className="ml-4 flex-1">
            <Text className="text-lg font-semibold text-gray-800 mb-1">
              {item.name}
            </Text>
            <View className="flex-row items-center mb-2">
              <Text className="text-sm text-gray-600 ml-2">{item.type}</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-600 ml-2">
                {item.manufacturer}
              </Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Text className="text-base font-semibold text-purple-600">
                {formatPrice(item.price)}
              </Text>
            </View>
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
    <View className="flex-1 bg-gray-50 mt-20">
      <View className="flex-1 p-4">
        <View className="flex-row items-center mb-5">
          <TouchableOpacity className="p-2" onPress={() => router.back()}>
            <Text className="text-2xl text-gray-800">←</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold ml-4 text-gray-800">
            All Medicine
          </Text>
        </View>

        <View className="mb-5">
          <View className="bg-white rounded-xl p-3 flex-row items-center shadow-sm">
            <TextInput
              className="flex-1 ml-2 text-base text-gray-600"
              placeholder="Search medicine..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View className="flex-row mb-5 bg-white rounded-xl p-1">
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`flex-1 py-3 items-center rounded-lg ${
                selectedCategory === category ? "bg-purple-600" : ""
              }`}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                className={`text-sm ${
                  selectedCategory === category
                    ? "text-white font-semibold"
                    : "text-gray-600"
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-base font-semibold text-gray-800">
            Found {filteredAndSortedMedicines.length} medicines
          </Text>
          <View className="flex-row items-center space-x-2">
            <Text className="text-sm text-gray-600">Sort by:</Text>
            <TouchableOpacity
              className={`px-3 py-1.5 rounded-lg ${
                sortOrder === "asc" ? "bg-purple-600" : "bg-gray-100"
              }`}
              onPress={() => setSortOrder("asc")}
            >
              <Text
                className={`text-sm ${
                  sortOrder === "asc" ? "text-white" : "text-gray-600"
                }`}
              >
                Low to High
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-3 py-1.5 rounded-lg ${
                sortOrder === "desc" ? "bg-purple-600" : "bg-gray-100"
              }`}
              onPress={() => setSortOrder("desc")}
            >
              <Text
                className={`text-sm ${
                  sortOrder === "desc" ? "text-white" : "text-gray-600"
                }`}
              >
                High to Low
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={filteredAndSortedMedicines}
          renderItem={renderMedicineCard}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
    </View>
  );
};

export default SeeMedicine1;
