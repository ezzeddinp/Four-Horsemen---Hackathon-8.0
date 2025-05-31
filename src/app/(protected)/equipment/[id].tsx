import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/providers/CartProvider";

interface EquipmentDetail {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  price: number;
  image: string;
  description: string;
  specifications: string;
  benefits: string;
}

const EquipmentDetails = () => {
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();

  // Sample equipment database - in real app, fetch from API using the id
  const equipmentDatabase: { [key: string]: EquipmentDetail } = {
    equip_1: {
      id: "equip_1",
      name: "Termometer Digital",
      type: "Monitoring",
      manufacturer: "PT Medika",
      price: 200000,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
      description:
        "High-precision digital thermometer for accurate body temperature measurement.",
      specifications: `Measurement Range: 32.0°C - 42.9°C
Accuracy: ±0.1°C
Response Time: 10 seconds
Battery Life: 1000 measurements
Display: LCD digital display`,
      benefits: `Quick and accurate temperature readings
Easy to read digital display
Memory function for last reading
Waterproof design
Suitable for all ages`,
    },
    equip_2: {
      id: "equip_2",
      name: "Timbangan Digital",
      type: "Monitoring",
      manufacturer: "PT Sehat",
      price: 250000,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
      description: "Precision digital scale for accurate weight measurement.",
      specifications: `Capacity: 150 kg
Accuracy: 0.1 kg
Platform Size: 30 x 30 cm
Auto Power Off: 60 seconds
Battery: 2x AAA batteries`,
      benefits: `High precision weight measurement
Large, easy-to-read display
Sturdy and durable construction
Auto-calibration feature
Suitable for home and medical use`,
    },
    equip_3: {
      id: "equip_3",
      name: "Pulse Oximeter",
      type: "Monitoring",
      manufacturer: "PT Medikal",
      price: 180000,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
      description:
        "Portable device for measuring oxygen saturation and pulse rate.",
      specifications: `SpO2 Range: 0-100%
Pulse Rate Range: 30-250 bpm
Accuracy: ±2%
Display: OLED screen
Battery: 2x AAA batteries`,
      benefits: `Quick and accurate readings
Easy to use
Portable design
Suitable for all ages
Helps monitor respiratory health`,
    },
    equip_4: {
      id: "equip_4",
      name: "First Aid Kit",
      type: "Emergency",
      manufacturer: "PT Safety",
      price: 150000,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
      description: "Comprehensive first aid kit for emergency situations.",
      specifications: `Contents: Bandages, gauze, antiseptic wipes
Size: 25 x 20 x 10 cm
Weight: 1.5 kg
Material: Waterproof case
Shelf Life: 3 years`,
      benefits: `Essential for emergency situations
Comprehensive medical supplies
Portable and durable
Easy to organize
Suitable for home and travel`,
    },
  };

  const equipment =
    equipmentDatabase[id as string] || equipmentDatabase["equip_1"];

  if (!equipment) {
    return (
      <SafeAreaView className="flex-1 bg-[#F2F0EF] justify-center items-center">
        <Text className="text-[#6B7280] text-lg mb-4">Equipment not found</Text>
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
              Equipment Details
            </Text>
          </View>

          {/* Equipment Card */}
          <View className="bg-[#F2F0EF] rounded-xl p-3 border border-[#F3F4F6] shadow-lg">
            <View className="flex-row items-center">
              <Image
                source={{ uri: equipment.image }}
                className="w-[109px] h-[109px] rounded-xl"
                resizeMode="cover"
              />
              <View className="flex-1 ml-3">
                <Text className="text-[#1F2A37] text-base font-bold">
                  {equipment.name}
                </Text>
                <View className="h-[1px] bg-[#E5E7EB] my-2" />
                <Text className="text-[#4B5563] text-sm font-semibold">
                  {equipment.type}
                </Text>
                <View className="flex-row items-center gap-1 mt-2">
                  <Ionicons name="business-outline" size={14} color="#4B5563" />
                  <Text className="text-[#4B5563] text-sm flex-1">
                    {equipment.manufacturer}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Specifications Section */}
        <View className="px-6 mb-6">
          <Text className="text-[#1F2A37] text-xl font-semibold mb-4">
            Specifications
          </Text>
          <Text className="text-[#6B7280] text-sm leading-5">
            {equipment.specifications}
          </Text>
        </View>

        {/* Benefits Section */}
        <View className="px-6 mb-8">
          <Text className="text-[#1F2A37] text-xl font-semibold mb-4">
            Benefits
          </Text>
          <Text className="text-[#6B7280] text-sm leading-5">
            {equipment.benefits}
          </Text>
        </View>

        {/* Price Section */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center">
            <Text className="text-black text-base font-bold">Price</Text>
            <Text className="text-black text-base font-bold">
              {formatPrice(equipment.price)}
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
              id: equipment.id,
              name: equipment.name,
              price: equipment.price,
              image: equipment.image,
              type: "equipment",
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

export default EquipmentDetails;
