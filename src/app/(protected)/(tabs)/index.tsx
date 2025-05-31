// App.tsx
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

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

const medicineData = [
  { id: 1, name: "Paracetamol 500mg", image: "https://via.placeholder.com/100x50" },
  { id: 2, name: "Amoxicillin 500mg", image: "https://via.placeholder.com/100x50" },
  { id: 3, name: "Ibuprofen 200mg", image: "https://via.placeholder.com/100x50" },
  { id: 4, name: "Aspirin 100mg", image: "https://via.placeholder.com/100x50" },
];

export default function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
        rating: 4.9, // Placeholder
        distance: "1 km Away", // Placeholder
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
  }, []);

  const renderDoctor = ({ item }: { item: Doctor }) => (
    <TouchableOpacity
      className="bg-white py-10 mr-4 rounded-2xl w-64"
      onPress={() => router.push(`/doctor/${item.id}`)}
    >
      <View className="flex flex-col items-center justify-center">
        <Image
          source={{ uri: item.avatar_url || "https://via.placeholder.com/100" }}
          className="w-52 h-32 items-center justify-center rounded-lg bg-gray-200"
        />
        <View className="flex-col items-start mt-4">
          <Text className="text-black text-lg font-bold">{item.nama_dokter}</Text>
          <Text className="text-gray-400 text-sm mt-1">
            Spesialis: <Text className="text-indigo-500">{item.keahlian}</Text>
          </Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-yellow-500 text-sm font-medium">★ {item.rating}</Text>
            <Text className="text-gray-400 text-sm ml-3">{item.distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMedicine = ({ item }: { item: { id: number; name: string; image: string } }) => (
    <View className="bg-white p-4 rounded-2xl w-[48%] mr-2">
      <Image
        source={{ uri: item.image }}
        className="w-full h-20 rounded-lg mb-3"
      />
      <Text className="text-black text-base mt-2 font-medium">{item.name}</Text>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center">
        <ActivityIndicator size="large" color="#A78DF8" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center">
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
    <View className="flex-1 bg-gray-100">
      <View className="bg-[#A78DF8] rounded-b-[150px] px-4 pt-8 gap-6 pb-2">
        <View className="flex-row justify-between items-center mb-4 mt-10">
          <View className="flex-row items-center gap-4">
            <Image className="h-24 w-24 rounded-full bg-gray-300" />
            <View className="flex-col">
              <Text className="text-white text-xl font-semibold">Hi Billy</Text>
              <Text className="text-white text-lg">How's your day today?</Text>
            </View>
          </View>
          <View className="flex-row flex items-center justify-center gap-2">
            <TouchableOpacity className="mr-3">
              <FontAwesome6 name="cart-shopping" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="notifications" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="bg-[#F2EDFE] rounded-2xl p-4 py-10">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-black text-xl font-bold">App Knowledge</Text>
            <TouchableOpacity className="bg-[#A78DF8] rounded-full px-3 py-2">
              <Text className="text-white text-md font-semibold">Learn More</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-black text-md">Progress</Text>
          <View className="w-full bg-white/30 h-2 rounded-full mt-1">
            <View className="bg-purple-400 h-2 rounded-full" style={{ width: "20%" }} />
          </View>
          <Text className="text-[#A78DF8] text-md mt-1">20%</Text>
        </View>
      </View>
      <ScrollView>
        <View className="px-4 mt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-black text-xl font-bold">Doctors</Text>
            <TouchableOpacity>
              <Text className="text-indigo-500 text-sm font-medium">View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={doctors}
            renderItem={renderDoctor}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
            ListEmptyComponent={<Text className="text-gray-500 text-center">No doctors found</Text>}
          />
        </View>
        <View className="px-4 mt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-black text-xl font-bold">Medicine</Text>
            <TouchableOpacity>
              <Text className="text-indigo-500 text-sm font-medium">View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={medicineData}
            renderItem={renderMedicine}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}