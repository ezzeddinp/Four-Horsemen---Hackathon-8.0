// App.tsx
import {
  FontAwesome6,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/providers/CartProvider";

interface Doctor {
  id: string;
  nama_dokter: string;
  keahlian: string;
  sertifikat: string;
  id_rumah_sakit: string;
  avatar_url?: string;
  jadwal: string;
  bio?: string;
  pengalaman?: number;
  rating?: number;
  distance?: string;
}

interface MedicalEquipment {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
}

const medicineData = [
  {
    id: "med_1",
    name: "Paracetamol 500mg",
    price: 12000,
    pharmacy: "Apotek Sehat Jaya",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "med_2",
    name: "Amoxicillin 500mg",
    price: 32000,
    pharmacy: "Apotek Sentosa",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "med_3",
    name: "Ibuprofen 200mg",
    price: 18000,
    pharmacy: "RS Harapan Bunda",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "med_4",
    name: "Cetirizine 10mg Tablet",
    price: 15000,
    pharmacy: "Apotek Kimia Farma",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
];

const medicalEquipmentData: MedicalEquipment[] = [
  {
    id: "equip_1",
    name: "Termometer Digital",
    type: "Temperature",
    price: 200000,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "equip_2",
    name: "Timbangan Digital",
    type: "Monitoring",
    price: 250000,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "equip_3",
    name: "Pulse Oximeter",
    type: "Monitoring",
    price: 180000,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "equip_4",
    name: "First Aid Kit",
    type: "Emergency",
    price: 150000,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
];

export default function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { getTotalItems, addToCart } = useCart();

  // Track visited pages for App Knowledge progress
  const NAV_PAGES = [
    "home",
    "doctor",
    "medicine",
    "equipment",
    "cart",
    "profile",
  ];
  const [visitedPages, setVisitedPages] = useState<string[]>(["home"]);
  const progress = Math.round((visitedPages.length / NAV_PAGES.length) * 100);

  // Helper to mark a page as visited
  const markVisited = (page: string) => {
    setVisitedPages((prev) => (prev.includes(page) ? prev : [...prev, page]));
  };

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("dokter")
        .select("*")
        .order("sertifikat", { ascending: false });

      if (fetchError) throw new Error(fetchError.message);

      const enhancedDoctors = data.map((doctor) => ({
        ...doctor,
        rating: 4.9,
        distance: "1.1 Km Away",
      }));
      setDoctors(enhancedDoctors || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch doctors");
      console.error("❌ Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
    // Mark home as visited on mount
    markVisited("home");
  }, []);

  const renderDoctor = ({ item }: { item: Doctor }) => (
    <View className="mr-4 mb-2">
      <TouchableOpacity
        className="bg-white rounded-2xl w-[165px] h-[205px]"
        onPress={() => router.push(`/doctor/${item.id}`)}
      >
        <View className="p-3">
          <Image
            source={
              item.avatar_url
                ? { uri: item.avatar_url }
                : require("assets/Profile_avatar_placeholder_large.png")
            }
            className="w-full h-[94px] rounded-xl"
            style={{ resizeMode: "cover" }}
          />
          <View className="mt-3">
            <Text
              className="text-[#3B4453] text-sm font-semibold"
              numberOfLines={1}
            >
              {item.nama_dokter}
            </Text>
            <Text className="text-gray-500 text-xs mt-1" numberOfLines={1}>
              {item.keahlian}
            </Text>
            <View className="flex-row items-center justify-between mt-3">
              <View className="bg-[#A78DF8]/15 rounded-md px-2 py-1 flex-row items-center">
                <Ionicons name="star" size={12} color="#A78DF8" />
                <Text className="text-[#A78DF8] text-xs ml-1 font-medium">
                  {item.rating}
                </Text>
              </View>
              <View className="flex-row items-center flex-1 ml-2">
                <Ionicons name="location" size={12} color="#AFAFAF" />
                <Text className="text-[#AFAFAF] text-xs ml-1" numberOfLines={1}>
                  {item.distance}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderMedicine = ({ item }: { item: (typeof medicineData)[0] }) => (
    <View className="mr-4 mb-2">
      <TouchableOpacity
        className="bg-white rounded-2xl w-[165px] h-[204px] relative"
        onPress={() => router.push(`/medicine/${item.id}`)}
      >
        <Image
          source={{ uri: item.image }}
          className="w-full h-[103px] rounded-t-2xl"
          style={{ resizeMode: "cover" }}
        />
        {/* Quick Add Button */}
        <TouchableOpacity
          className="absolute top-2 right-2 bg-[#A78DF8] rounded-full p-1.5"
          onPress={(e) => {
            e.stopPropagation();
            addToCart({
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image,
              type: "medicine",
            });
          }}
        >
          <Ionicons name="add" size={16} color="white" />
        </TouchableOpacity>
        <View className="p-3">
          <Text className="text-[#A78DF8] text-xs font-semibold">
            Rp {item.price.toLocaleString("id-ID")}
          </Text>
          <Text
            className="text-black text-sm font-semibold mt-2"
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <View className="flex-row items-center mt-2">
            <Ionicons name="location" size={12} color="#AFAFAF" />
            <Text
              className="text-[#AFAFAF] text-xs ml-1 flex-1"
              numberOfLines={1}
            >
              {item.pharmacy}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderMedicalEquipment = ({ item }: { item: MedicalEquipment }) => (
    <View className="mr-4 mb-2">
      <TouchableOpacity
        className="bg-white rounded-2xl w-[165px] h-[204px] relative"
        onPress={() => router.push(`/equipment/${item.id}`)}
      >
        <Image
          source={{ uri: item.image }}
          className="w-full h-[103px] rounded-t-2xl"
          style={{ resizeMode: "cover" }}
        />
        {/* Quick Add Button */}
        <TouchableOpacity
          className="absolute top-2 right-2 bg-[#A78DF8] rounded-full p-1.5"
          onPress={(e) => {
            e.stopPropagation();
            addToCart({
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image,
              type: "equipment",
            });
          }}
        >
          <Ionicons name="add" size={16} color="white" />
        </TouchableOpacity>
        <View className="p-3">
          <Text className="text-[#A78DF8] text-xs font-semibold">
            Rp {item.price.toLocaleString("id-ID")}
          </Text>
          <Text
            className="text-black text-sm font-semibold mt-2"
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <View className="flex-row items-center mt-2">
            <Ionicons name="location" size={12} color="#AFAFAF" />
            <Text
              className="text-[#AFAFAF] text-xs ml-1 flex-1"
              numberOfLines={1}
            >
              Apotek Sehat Jaya
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 bg-[#F2F0EF] justify-center items-center">
        <ActivityIndicator size="large" color="#A78DF8" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-[#F2F0EF] justify-center items-center">
        <Text className="text-red-500 text-lg">{error}</Text>
        <TouchableOpacity
          className="mt-4 bg-[#A78DF8] px-4 py-2 rounded-lg"
          onPress={fetchDoctors}
        >
          <Text className="text-white text-base">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#F2F0EF]">
      <View className="bg-[#A78DF8] rounded-b-[20px] px-6 pt-8">
        <View className="flex-row justify-between items-center mt-10">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity
              onPress={() => {
                router.push("/profile");
                markVisited("profile");
              }}
            >
              <Image
                source={require("assets/Profile_avatar_placeholder_large.png")}
                className="w-12 h-12 rounded-full"
              />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-base font-medium">Hi Billy</Text>
              <Text className="text-white/80 text-sm">Welcome back!</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-4">
            <TouchableOpacity
              className="relative"
              onPress={() => {
                router.push("/cart");
                markVisited("cart");
              }}
            >
              <FontAwesome6 name="cart-shopping" size={24} color="white" />
              {getTotalItems() > 0 && (
                <View className="absolute -top-2 -right-2 bg-red-500 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {getTotalItems() > 99 ? "99+" : getTotalItems()}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-[#F2EDFE] rounded-xl p-4 mt-6 mb-6">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons name="brain" size={24} color="#A78DF8" />
              <Text className="text-black text-base font-semibold">
                App Knowledge
              </Text>
            </View>
          </View>
          <Text className="text-black text-sm">Progress</Text>
          <View className="w-full bg-white/30 h-2 rounded-full mt-1">
            <View
              className="bg-[#A78DF8] h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>
          <Text className="text-[#A78DF8] text-sm mt-1">{progress}%</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="px-6 mt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-black text-lg font-semibold">Doctors</Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/doctor");
                markVisited("doctor");
              }}
            >
              <Text className="text-[#A78DF8] text-sm font-medium">
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={doctors}
            renderItem={renderDoctor}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24, paddingBottom: 8 }}
            ListEmptyComponent={
              <Text className="text-gray-500 text-center">
                No doctors found
              </Text>
            }
          />
        </View>

        <View className="px-6 mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-black text-lg font-semibold">Medicine</Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/medicine");
                markVisited("medicine");
              }}
            >
              <Text className="text-[#A78DF8] text-sm font-medium">
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={medicineData}
            renderItem={renderMedicine}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24, paddingBottom: 8 }}
          />
        </View>

        <View className="px-6 mt-8 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-black text-lg font-semibold">
              Medical Equipment
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/equipment");
                markVisited("equipment");
              }}
            >
              <Text className="text-[#A78DF8] text-sm font-medium">
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={medicalEquipmentData}
            renderItem={renderMedicalEquipment}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24, paddingBottom: 8 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
