import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/providers/CartProvider";

interface MedicineDetail {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  price: number;
  image: string;
  description: string;
  ingredients: string;
  benefits: string;
}

const MedicineDetails = () => {
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();

  // Sample medicine database - in real app, fetch from API using the id
  const medicineDatabase: { [key: string]: MedicineDetail } = {
    med_1: {
      id: "med_1",
      name: "Paracetamol 500mg",
      type: "For Fever & Pain",
      manufacturer: "PT Kimia Farma",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
      description:
        "Effective pain relief and fever reducer for adults and children.",
      ingredients: `Paracetamol – 500 mg
Active ingredient for pain relief and fever reduction
Excipients – Microcrystalline cellulose, starch`,
      benefits: `Reduces fever quickly and effectively

Relieves headaches, muscle aches, and minor pain

Safe for both adults and children when used as directed

Fast-acting formula provides relief within 30 minutes`,
    },
    med_2: {
      id: "med_2",
      name: "Amoxicillin 500mg",
      type: "Antibiotic",
      manufacturer: "PT Sanbe Farma",
      price: 25000,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
      description: "Broad-spectrum antibiotic for bacterial infections.",
      ingredients: `Amoxicillin – 500 mg
Penicillin-type antibiotic
Lactose monohydrate, magnesium stearate`,
      benefits: `Treats bacterial infections effectively

Works against respiratory tract infections

Helps with skin and soft tissue infections

Proven effectiveness against common bacterial strains`,
    },
    med_3: {
      id: "med_3",
      name: "Ibuprofen 200mg",
      type: "Pain Relief",
      manufacturer: "PT Combiphar",
      price: 18000,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
      description: "Effective pain relief and anti-inflammatory medication.",
      ingredients: `Ibuprofen – 200 mg
Anti-inflammatory active ingredient
Microcrystalline cellulose, lactose`,
      benefits: `Reduces pain and inflammation

Effective for headaches and muscle pain

Anti-inflammatory properties

Suitable for adults and children over 12 years`,
    },
    med_4: {
      id: "med_4",
      name: "Cetirizine 10mg Tablet",
      type: "Antihistamine",
      manufacturer: "PT Kimia Farma",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
      description: "Effective antihistamine for allergy relief.",
      ingredients: `Cetirizine Dihydrochloride – 10 mg
Antihistamine active ingredient
Lactose monohydrate, corn starch`,
      benefits: `Relieves allergy symptoms effectively

Reduces sneezing and runny nose

Helps with itchy and watery eyes

Non-drowsy formula

Long-lasting 24-hour relief`,
    },
    med_5: {
      id: "med_5",
      name: "Promag",
      type: "Antacid",
      manufacturer: "PT Kalbe Farma",
      price: 20000,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
      description: "Effective antacid for stomach acid relief.",
      ingredients: `Aluminum Hydroxide – 200 mg
Magnesium Hydroxide – 200 mg
Simethicone – 25 mg`,
      benefits: `Neutralizes excess stomach acid

Relieves heartburn and indigestion

Reduces bloating and gas

Fast-acting formula

Safe for regular use`,
    },
  };

  const medicine = medicineDatabase[id as string] || medicineDatabase["med_1"];

  if (!medicine) {
    return (
      <SafeAreaView className="flex-1 bg-[#F2F0EF] justify-center items-center">
        <Text className="text-[#6B7280] text-lg mb-4">Medicine not found</Text>
        <TouchableOpacity
          className="bg-[#A78DF8] px-6 py-3 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F0EF]">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center mb-6">
            <TouchableOpacity onPress={() => router.back()} className="mr-6">
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-[#374151] text-xl font-semibold">
              Medicine Details
            </Text>
          </View>

          {/* Medicine Card */}
          <View className="bg-[#F2F0EF] rounded-xl p-3 border border-[#F3F4F6] shadow-lg">
            <View className="flex-row items-center">
              <Image
                source={{ uri: medicine.image }}
                className="w-[109px] h-[109px] rounded-xl"
                resizeMode="cover"
              />
              <View className="flex-1 ml-3">
                <Text className="text-[#1F2A37] text-base font-bold">
                  {medicine.name}
                </Text>
                <View className="h-[1px] bg-[#E5E7EB] my-2" />
                <Text className="text-[#4B5563] text-sm font-semibold">
                  {medicine.type}
                </Text>
                <View className="flex-row items-center gap-1 mt-2">
                  <Ionicons name="business-outline" size={14} color="#4B5563" />
                  <Text className="text-[#4B5563] text-sm flex-1">
                    {medicine.manufacturer}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Ingredients Section */}
        <View className="px-6 mb-6">
          <Text className="text-[#1F2A37] text-xl font-semibold mb-4">
            Ingredients
          </Text>
          <Text className="text-[#6B7280] text-sm leading-5">
            {medicine.ingredients}
          </Text>
        </View>

        {/* Benefits Section */}
        <View className="px-6 mb-8">
          <Text className="text-[#1F2A37] text-xl font-semibold mb-4">
            Benefits
          </Text>
          <Text className="text-[#6B7280] text-sm leading-5">
            {medicine.benefits}
          </Text>
        </View>

        {/* Price Section */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center">
            <Text className="text-black text-base font-bold">Price</Text>
            <Text className="text-black text-base font-bold">
              {formatPrice(medicine.price)}
            </Text>
          </View>
        </View>

        {/* Spacer for bottom button */}
        <View className="h-20" />
      </ScrollView>

      {/* Bottom Button */}
      <View className="left-0 right-0 bg-[#F2F0EF] px-6 py-6">
        <TouchableOpacity
          className="bg-[#A78DF8] rounded-full py-3 px-5 flex-row justify-center items-center shadow-lg"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 8,
          }}
          onPress={() => {
            addToCart({
              id: medicine.id,
              name: medicine.name,
              price: medicine.price,
              image: medicine.image,
              type: "medicine",
            });
            // Show success feedback and navigate to cart
            router.push("/cart");
          }}
        >
          <Text className="text-white text-base font-bold">
            Add To Shopping Cart
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MedicineDetails;
