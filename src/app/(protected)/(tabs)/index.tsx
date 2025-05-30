import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

interface Doctor {
  id: string;
  nama_dokter: string;
  keahlian: string;
  sertifikat: string;
  id_rumah_sakit: string;
  avatar_url?: string;
  jadwal: string;
}

export default function DokterList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const router = useRouter();

  const fetchDoctors = async () => {
    const { data, error } = await supabase
      .from("dokter")
      .select("*")
      .order("sertifikat", { ascending: false });

    if (error) {
      console.error("❌ Gagal fetch dokter:", error.message);
      return;
    }

    setDoctors(data || []);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const renderDoctor = ({ item }: { item: Doctor }) => (
    <View
      className="bg-white p-4 mb-4 rounded-2xl flex-row items-center"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Image
        source={{ uri: item.avatar_url || "https://via.placeholder.com/64" }}
        className="w-16 h-16 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className="text-black text-lg font-bold">
          {item.nama_dokter}
        </Text>
        <Text className="text-gray-500 text-sm mb-1">
          Spesialis: <Text className="text-indigo-500">{item.keahlian}</Text>
        </Text>
        <Text className="text-gray-400 text-xs italic">
          Sertifikat: {item.sertifikat}
        </Text>
      </View>
      <TouchableOpacity
        className="bg-indigo-600 px-4 py-2 rounded-lg"
        onPress={() => router.push(`/booking?doctorId=${item.id}`)}
      >
        <Text className="text-white text-sm font-semibold">Booking</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Bagian ungu dengan header */}
      <View className="h-48 bg-[#A78DF8] rounded-b-3xl px-4 pt-8">
        <Text className="text-white text-3xl font-bold text-center mt-4">
          Daftar Dokter
        </Text>
      </View>

      {/* Card-container dengan overlap ke bagian ungu */}
      <View className="flex-1 -mt-12 px-4">
        <FlatList
          data={doctors}
          renderItem={renderDoctor}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </View>
  );
}
