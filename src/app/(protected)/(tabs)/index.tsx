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
    id: 1,
    name: "Paracetamol 500mg",
    price: 12000,
    pharmacy: "Apotek Sehat Jaya",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    name: "Amoxicillin 500mg",
    price: 32000,
    pharmacy: "Apotek Sentosa",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    name: "Ibuprofen 200mg",
    price: 18000,
    pharmacy: "RS Harapan Bunda",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Cetirizine 10mg Tablet",
    price: 15000,
    pharmacy: "Apotek Kimia Farma",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
];

const medicalEquipmentData: MedicalEquipment[] = [
  {
    id: "1",
    name: "Termometer Digital",
    type: "Temperature",
    price: 200000,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "2",
    name: "Timbangan Digital",
    type: "Monitoring",
    price: 250000,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "3",
    name: "Pulse Oximeter",
    type: "Monitoring",
    price: 180000,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "4",
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
  }, []);

  const renderDoctor = ({ item }: { item: Doctor }) => (
    <TouchableOpacity
      className="bg-white rounded-2xl w-[165px] h-[205px] mr-4 shadow-sm"
      onPress={() => router.push(`/doctor/${item.id}`)}
    >
      <Image
        source={{
          uri:
            item.avatar_url ||
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9jdG9yfGVufDB8fDB8fHww",
        }}
        className="w-[141px] h-[94px] rounded-xl mx-3 mt-3"
      />
      <View className="px-3 mt-2">
        <Text className="text-[#3B4453] text-sm font-medium">
          {item.nama_dokter}
        </Text>
        <Text className="text-gray-500 text-xs mt-1">{item.keahlian}</Text>
        <View className="flex-row items-center mt-4">
          <View className="bg-[#A78DF8]/30 rounded-md px-2 py-1 flex-row items-center">
            <Ionicons name="star" size={16} color="#A78DF8" />
            <Text className="text-[#A78DF8] text-xs ml-1">{item.rating}</Text>
          </View>
          <View className="flex-row items-center ml-4">
            <Ionicons name="location" size={14} color="#AFAFAF" />
            <Text className="text-[#AFAFAF] text-xs ml-1">{item.distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMedicine = ({ item }: { item: (typeof medicineData)[0] }) => (
    <View className="bg-white rounded-2xl w-[165px] h-[204px] mr-5 shadow-sm">
      <Image
        source={{ uri: item.image }}
        className="w-full h-[103px] rounded-t-2xl"
      />
      <View className="p-3">
        <Text className="text-gray-500 text-xs">
          Rp {item.price.toLocaleString("id-ID")}
        </Text>
        <Text className="text-black text-sm font-semibold mt-2">
          {item.name}
        </Text>
        <View className="flex-row items-center mt-4">
          <Ionicons name="location" size={14} color="#AFAFAF" />
          <Text className="text-[#AFAFAF] text-xs ml-1">{item.pharmacy}</Text>
        </View>
      </View>
    </View>
  );

  const renderMedicalEquipment = ({ item }: { item: MedicalEquipment }) => (
    <View className="bg-white rounded-2xl w-[165px] h-[204px] mr-5 shadow-sm">
      <Image
        source={{ uri: item.image }}
        className="w-full h-[103px] rounded-t-2xl"
      />
      <View className="p-3">
        <Text className="text-gray-500 text-xs">
          Rp {item.price.toLocaleString("id-ID")}
        </Text>
        <Text className="text-black text-sm font-semibold mt-2">
          {item.name}
        </Text>
        <View className="flex-row items-center mt-4">
          <Ionicons name="location" size={14} color="#AFAFAF" />
          <Text className="text-[#AFAFAF] text-xs ml-1">Apotek Sehat Jaya</Text>
        </View>
      </View>
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
            <Image
              source={require("assets/Profile_avatar_placeholder_large.png")}
              className="w-12 h-12 rounded-full"
            />
            <View>
              <Text className="text-white text-base font-medium">Hi Billy</Text>
              <Text className="text-white/80 text-sm">Welcome back!</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-4">
            <TouchableOpacity>
              <FontAwesome6 name="cart-shopping" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="notifications" size={24} color="white" />
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
              style={{ width: "20%" }}
            />
          </View>
          <Text className="text-[#A78DF8] text-sm mt-1">20%</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="px-6 mt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-black text-lg font-semibold">Doctors</Text>
            <TouchableOpacity onPress={() => router.push("/doctor")}>
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
            contentContainerStyle={{ paddingRight: 16 }}
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
            <TouchableOpacity onPress={() => router.push("/medicine")}>
              <Text className="text-[#A78DF8] text-sm font-medium">
                View All
              </Text>
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

        <View className="px-6 mt-8 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-black text-lg font-semibold">
              Medical Equipment
            </Text>
            <TouchableOpacity>
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
            contentContainerStyle={{ paddingRight: 16 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
